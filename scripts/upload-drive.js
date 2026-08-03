const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

async function uploadResume() {
  try {
    // -----------------------------
    // Validate environment variables
    // -----------------------------
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY is missing.");
    }

    if (!process.env.GOOGLE_DRIVE_FILE_ID) {
      throw new Error("GOOGLE_DRIVE_FILE_ID is missing.");
    }

    // -----------------------------
    // Parse Service Account JSON
    // -----------------------------
    const credentials = JSON.parse(
      process.env.GOOGLE_SERVICE_ACCOUNT_KEY
    );

    // -----------------------------
    // Authenticate
    // -----------------------------
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const drive = google.drive({
      version: "v3",
      auth,
    });

    // -----------------------------
    // Resume path
    // -----------------------------
    const pdfPath = path.join(process.cwd(), "public", "resume.pdf");

    if (!fs.existsSync(pdfPath)) {
      throw new Error(`Resume not found at ${pdfPath}`);
    }

    console.log("Uploading:", pdfPath);

    // -----------------------------
    // Replace existing file
    // -----------------------------
    await drive.files.update({
      fileId: process.env.GOOGLE_DRIVE_FILE_ID,
      media: {
        mimeType: "application/pdf",
        body: fs.createReadStream(pdfPath),
      },
    });

    console.log("✅ Google Drive resume updated successfully.");
  } catch (err) {
    console.error("❌ Google Drive upload failed.");
    console.error(err);

    // Do NOT fail the workflow
    process.exit(0);
  }
}

uploadResume();