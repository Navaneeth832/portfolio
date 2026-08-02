import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Code2, Download, ExternalLink, Check, Copy, Sparkles, MessageSquare } from 'lucide-react';
import { ENDPOINTS } from '../config';

interface ContactProps {
  darkMode: boolean;
}

const triggerConfetti = () => {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    size: number;
    alpha: number;
  }> = [];

  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 + 100,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.7) * 14,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 4,
      alpha: 1
    });
  }

  let frame = 0;
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.3; // gravity
      p.alpha -= 0.015;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
      ctx.restore();
    });

    frame++;
    if (frame < 80) {
      requestAnimationFrame(animate);
    } else {
      document.body.removeChild(canvas);
    }
  };

  animate();
};

const Contact: React.FC<ContactProps> = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
  
    try {
      const response = await fetch(ENDPOINTS.contact, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Server is sleeping or unreachable, please try again later.");
      }

      const result = await response.json();
  
      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        try {
          triggerConfetti();
        } catch (e) {
          // fallback
        }
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.error || "Failed to send message.");
      }
    } catch (error: any) {
      console.error("Error:", error);
      setSubmitStatus("error");
      setErrorMessage(error.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = "/resume.pdf";
    link.target = "_blank";
    link.download = 'Navaneeth_Krishna_G_Resume.pdf';
    link.click();
  };

  return (
    <section id="contact" className={`py-24 relative overflow-hidden ${
      darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 mb-4">
            <MessageSquare size={14} /> Get In Touch
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Let's <span className="text-indigo-500">Connect</span>
          </h2>
          <p className={`mt-4 text-base sm:text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Open for software engineering roles, full-stack development, agentic AI collaborations, or tech discussions.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`p-8 rounded-3xl border glass-card ${
              darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200 shadow-sm'
            }`}>
              <h3 className={`text-xl sm:text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Contact Information
              </h3>
              
              <div className="space-y-5">
                
                {/* Email Item */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-100/50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50">
                  <div className="flex items-center gap-3.5 overflow-hidden">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500">
                      <Mail size={18} />
                    </div>
                    <div className="truncate">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Email</span>
                      <a href={`mailto:${resumeData.personal.email}`} className="text-sm font-semibold hover:text-indigo-500 transition-colors truncate block">
                        {resumeData.personal.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(resumeData.personal.email, 'email')}
                    className={`p-2 rounded-xl border text-xs transition-all ${
                      darkMode ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-100'
                    }`}
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  </button>
                </div>

                {/* Phone Item */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-100/50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50">
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Phone</span>
                      <a href={`tel:${resumeData.personal.phone.replace(/\s+/g, '')}`} className="text-sm font-semibold hover:text-emerald-500 transition-colors block">
                        {resumeData.personal.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(resumeData.personal.phone, 'phone')}
                    className={`p-2 rounded-xl border text-xs transition-all ${
                      darkMode ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-100'
                    }`}
                    title="Copy Phone Number"
                  >
                    {copiedPhone ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  </button>
                </div>

                {/* Location Item */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-100/50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50">
                  <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Location</span>
                    <span className="text-sm font-semibold block">
                      {resumeData.personal.location}
                    </span>
                  </div>
                </div>

              </div>

              {/* Social Accounts */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block mb-3">
                  Professional Networks
                </span>
                <div className="flex gap-3">
                  <a
                    href={resumeData.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      darkMode ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-white' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <Github size={16} /> GitHub
                  </a>
                  <a
                    href={resumeData.personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      darkMode ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-white' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <Linkedin size={16} /> LinkedIn
                  </a>
                  <a
                    href={`https://leetcode.com/u/Navaneeth832/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      darkMode ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-white' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <Code2 size={16} /> LeetCode
                  </a>
                </div>
              </div>

              {/* Resume Buttons */}
              <div className="mt-8 space-y-3">
                <a
                  href="/resume.pdf"
                  download="Navaneeth_Krishna_G_Resume.pdf"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md shadow-indigo-600/30 transition-all"
                >
                  <Download size={18} />
                  <span>Download Verified Resume (PDF)</span>
                </a>
              </div>

            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className={`p-8 rounded-3xl border glass-card ${
              darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200 shadow-sm'
            }`}>
              <h3 className={`text-xl sm:text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Send Me a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label 
                      htmlFor="name" 
                      className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        darkMode 
                          ? 'bg-slate-800/60 border-slate-700 text-white placeholder-slate-500' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                      placeholder="e.g. Alex Smith"
                    />
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="email" 
                      className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        darkMode 
                          ? 'bg-slate-800/60 border-slate-700 text-white placeholder-slate-500' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                      placeholder="alex@company.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label 
                    htmlFor="message" 
                    className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none ${
                      darkMode 
                        ? 'bg-slate-800/60 border-slate-700 text-white placeholder-slate-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                    }`}
                    placeholder="Describe your project, inquiry, or opportunity..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
                
                {submitStatus === 'success' && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-sm font-semibold flex items-center gap-2">
                    <Sparkles size={18} />
                    <span>Thank you! Your message was sent successfully. I will get back to you soon.</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-sm font-semibold">
                    {errorMessage || "Error sending message. Please try again later."}
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;