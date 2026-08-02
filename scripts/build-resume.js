import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import crypto from 'crypto';

import { fileURLToPath } from 'url';

// Setup paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.dirname(__dirname);
const dataPath = path.join(projectRoot, 'src', 'data', 'resume.json');
const texOutputPath = path.join(projectRoot, 'resume.tex');
const pdfOutputDir = path.join(projectRoot, 'public');
const pdfOutputPath = path.join(pdfOutputDir, 'resume.pdf');

// LaTeX Escaping Utility
function escapeLatex(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/[{}]/g, '\\$&')
    .replace(/[&%$#_]/g, '\\$&')
    .replace(/[~^]/g, '\\$&{}')
    .replace(/>=/g, '$\\ge$')
    .replace(/<=/g, '$\\le$');
}

// Google OAuth JWT generator
function base64Url(obj) {
  return Buffer.from(JSON.stringify(obj))
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

async function getGoogleAccessToken(serviceAccountKeyJson) {
  const key = JSON.parse(serviceAccountKeyJson);
  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const claimSet = {
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/drive',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };

  const jwtHeader = base64Url(header);
  const jwtClaim = base64Url(claimSet);
  const signInput = `${jwtHeader}.${jwtClaim}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signInput);
  const signature = signer.sign(key.private_key, 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const jwt = `${signInput}.${signature}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`
  });

  if (!tokenRes.ok) {
    const errorBody = await tokenRes.text();
    throw new Error(`Google Auth Token request failed: ${tokenRes.status} - ${errorBody}`);
  }

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

async function uploadToGoogleDrive(filePath, fileId, serviceAccountKeyJson) {
  try {
    console.log('🔄 Uploading generated PDF to Google Drive...');
    const accessToken = await getGoogleAccessToken(serviceAccountKeyJson);
    const fileBuffer = fs.readFileSync(filePath);

    const url = `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`;
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/pdf'
      },
      body: fileBuffer
    });

    if (!res.ok) {
      throw new Error(`Google Drive API responded with ${res.status} ${res.statusText}`);
    }
    console.log('✅ Successfully synchronized resume to Google Drive.');
  } catch (err) {
    console.warn('⚠️ Google Drive Sync failed:', err.message);
  }
}

async function main() {
  console.log('🔄 Generating LaTeX resume from structured data...');

  if (!fs.existsSync(dataPath)) {
    console.error(`❌ Data file not found at: ${dataPath}`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const { personal, profileSummary, education, experience, projects, technicalSkills, profilesAndAchievements, certificates, languages } = data;

  // 1. Education
  const educationTex = education.map(edu => {
    const scoreLabel = edu.score.includes('%') ? 'Percentage' : 'CGPA';
    const cleanScore = edu.score.replace(/CGPA:\s*/, '').replace(/Percentage:\s*/, '');
    return `\\textbf{${escapeLatex(edu.degree)}} \\hfill ${escapeLatex(edu.period)} \\\\
${escapeLatex(edu.institution)} \\\\
${scoreLabel}: ${escapeLatex(cleanScore)}`;
  }).join('\n\n\\vspace{8pt}\n');

  // 2. Experience
  const experienceTex = experience.map(exp => {
    const bullets = exp.highlights.map(pt => `    \\item ${escapeLatex(pt)}`).join('\n');
    return `\\textbf{${escapeLatex(exp.title)}} \\hfill ${escapeLatex(exp.period)} \\\\
\\textbf{${escapeLatex(exp.company)}} 
\\begin{itemize}[leftmargin=0.15in]
${bullets}
\\end{itemize}`;
  }).join('\n\n\\vspace{8pt}\n');

  // 3. Projects
  const projectsTex = projects.map(proj => {
    const bullets = proj.highlights.map(pt => `    \\item ${escapeLatex(pt)}`).join('\n');
    let subtitleLine = '';
    if (proj.id === 'lab-record-studio') {
      subtitleLine = `\\textit{
Live:
\\href{https://record-latex-generator.onrender.com}{record-latex-generator.onrender.com}
\\\\
GitHub:
\\href{https://github.com/Navaneeth832/record_latex_generator}{github.com/Navaneeth832/record\\_latex\\_generator}
}\n`;
    }
    return `\\item
\\textbf{${escapeLatex(proj.title)}} $|$ \\emph{${escapeLatex(proj.tech.join(', '))}} \\hfill ${escapeLatex(proj.period)} \\\\
${subtitleLine}\\begin{itemize}
${bullets}
\\end{itemize}`;
  }).join('\n\n\\vspace{8pt}\n\n');

  // 4. Skills
  const formattedSkills = {};
  Object.keys(technicalSkills).forEach(key => {
    formattedSkills[key] = technicalSkills[key].join(', ');
  });

  // 5. Certificates
  let certificatesTex = '';
  const certCount = certificates.length;
  for (let i = 0; i < certCount; i++) {
    if (i === certCount - 3 && certCount % 2 !== 0) {
      const c1 = certificates[i];
      const c2 = certificates[i+1];
      const c3 = certificates[i+2];
      certificatesTex += `${escapeLatex(c1.title)}, \\textit{${escapeLatex(c1.issuer)}} \\hfill | \\hfill\n`;
      certificatesTex += `${escapeLatex(c2.title)}, \\textit{${escapeLatex(c2.issuer)}} | \\hfill\n`;
      certificatesTex += `${escapeLatex(c3.title)}, \\textit{${escapeLatex(c3.issuer)}}\n`;
      break;
    } else if (i % 2 === 0) {
      const c1 = certificates[i];
      if (i + 1 < certCount) {
        const c2 = certificates[i+1];
        certificatesTex += `${escapeLatex(c1.title)}, \\textit{${escapeLatex(c1.issuer)}} \\hfill | \\hfill\n`;
        certificatesTex += `${escapeLatex(c2.title)}, \\textit{${escapeLatex(c2.issuer)}} \\\\\n`;
      } else {
        certificatesTex += `${escapeLatex(c1.title)}, \\textit{${escapeLatex(c1.issuer)}}\n`;
      }
    }
  }

  // 6. Languages
  const languagesTex = languages.map(lang => `${escapeLatex(lang.name)} (${escapeLatex(lang.level)})`).join(', ');

  // Construct complete LaTeX string
  const texContent = `% ─────────────────────────────────────────────────────────────────────────────
% GENERATED FILE - DO NOT EDIT THIS FILE DIRECTLY.
% Edit the structured data source at: src/data/resume.json
% ─────────────────────────────────────────────────────────────────────────────

\\documentclass[11pt, a4paper]{article}
\\usepackage{hyperref}

% --- PDFLATEX COMPATIBLE PREAMBLE ---
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage[a4paper, top=1.2cm, bottom=1.2cm, left=1.5cm, right=1.5cm]{geometry}
\\usepackage[english]{babel}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{titlesec}
\\usepackage{xcolor}
\\pagenumbering{gobble}

% Using Noto Sans for pdfLaTeX to match your original PDF look perfectly
\\usepackage[sfdefault]{noto}

% Remove paragraph indentation
\\setlength{\\parindent}{0pt}

% Custom section formatting: Bold, Uppercase, with a line
\\titleformat{\\section}{\\large\\bfseries}{}{0pt}{}[\\titlerule]
\\titlespacing{\\section}{0pt}{14pt}{6pt}

\\hypersetup{
    colorlinks=true,
    linkcolor=black,
    urlcolor=black,
}

\\begin{document}

% --- HEADER ---
\\begin{center}
    {\\Huge \\textbf{${personal.name}}} \\\\
    \\vspace{2pt}
    {\\large ${personal.title}} \\\\
    \\vspace{4pt}
    \\small 
    \\href{mailto:${personal.email}}{${personal.email}} \\ | \\ \\href{${personal.linkedin}}{${personal.linkedinUsername}} \\\\
  | \\href{${personal.github}}{${personal.githubUsername.replace("https://", "")}} \\\\
    ${personal.location} \\ | \\ ${personal.phone}
\\end{center}

\\vspace{10pt}

% --- SUMMARY ---
\\section{Profile Summary}
${profileSummary}

% --- EDUCATION ---
\\section*{Education}
${educationTex}

% --- WORK EXPERIENCE ---
\\section*{Work Experience}
${experienceTex}

% --- PROJECTS ---
\\section*{Projects}
\\begin{itemize}[leftmargin=0.15in]
${projectsTex}
\\end{itemize}

% --- CORE SKILLS ---
\\section*{Technical Skills}
\\begin{itemize}[leftmargin=0.15in, label={}]
\\small{\\item{
    \\textbf{Languages}{: ${formattedSkills.Languages}} \\\\
    \\textbf{Backend \\& Frameworks}{: ${formattedSkills['Backend & Frameworks']}} \\\\
    \\textbf{Frontend \\& Mobile}{: ${formattedSkills['Frontend & Mobile']}} \\\\
    \\textbf{Databases \\& Cloud}{: ${formattedSkills['Databases & Cloud']}} \\\\
    \\textbf{Tools \\& Technologies}{: ${formattedSkills['Tools & Technologies']}} \\\\
    \\textbf{AI/ML}{: ${formattedSkills['AI/ML']}}
}}
\\end{itemize}

\\section*{Profiles \\& Achievements}
\\begin{itemize}[leftmargin=0.15in, label={}]
\\small{\\item{
    \\textbf{${profilesAndAchievements.gate.title}}{: Achieved \\textbf{${profilesAndAchievements.gate.detail}}} \\\\
    \\textbf{${profilesAndAchievements.leetcode.title}}{: Solved \\textbf{${profilesAndAchievements.leetcode.detail}} problems across key DSA patterns} \\\\
    \\textbf{${profilesAndAchievements.gfg.title}}{: Ranked in the \\textbf{${profilesAndAchievements.gfg.detail}} in university rankings for problem-solving consistency}
}}
\\end{itemize}

% --- CERTIFICATES ---
\\section*{Certificates}
${certificatesTex}

% --- LANGUAGES ---
\\section*{Languages}
${languagesTex}

\\end{document}
`;

  // Write .tex output
  fs.writeFileSync(texOutputPath, texContent, 'utf8');
  console.log(`✅ Generated resume.tex successfully at: ${texOutputPath}`);

  // Create public directory if not exists
  if (!fs.existsSync(pdfOutputDir)) {
    fs.mkdirSync(pdfOutputDir, { recursive: true });
  }

  // Compile PDF
  try {
    console.log('🔄 Attempting compilation using pdflatex...');
    execSync(`pdflatex -interaction=nonstopmode -output-directory="${pdfOutputDir}" "${texOutputPath}"`, { stdio: 'ignore' });
    
    // Clean up auxiliary LaTeX files (.aux, .log, .out)
    const baseName = path.basename(texOutputPath, '.tex');
    const auxFiles = ['.aux', '.log', '.out'].map(ext => path.join(pdfOutputDir, `${baseName}${ext}`));
    auxFiles.forEach(file => {
      if (fs.existsSync(file)) fs.unlinkSync(file);
    });

    console.log(`✅ Successfully compiled resume.pdf at: ${pdfOutputPath}`);

    // Optional Google Drive Upload
    const fileId = process.env.GOOGLE_DRIVE_FILE_ID || '1FMSIt8EJnDTBjnRRKS6xvKZbJvI5eypv';
    const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    if (credentials) {
      await uploadToGoogleDrive(pdfOutputPath, fileId, credentials);
    } else {
      console.log('ℹ️ GOOGLE_SERVICE_ACCOUNT_KEY not set. Skipping Google Drive sync.');
    }

  } catch (err) {
    console.warn('\n⚠️  LaTeX compilation failed or pdflatex is not installed locally.');
    console.warn('   The generated LaTeX source is available at: resume.tex');
    console.warn('   You can upload it to Overleaf or run pdflatex manually to get the PDF.\n');
  }
}

main();
