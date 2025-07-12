import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Download, ExternalLink } from 'lucide-react';

interface ContactProps {
  darkMode: boolean;
}

const Contact: React.FC<ContactProps> = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null); // Clear any previous status
  
    try {
      const response = await fetch("https://portfolio-backend-7ztq.onrender.com/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Server is sleeping, please try again later.");
      }
      const result = await response.json();
  
      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
        console.error("Error:", result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const downloadResume = () => {
    // In a real application, this would download the actual resume
    const link = document.createElement('a');
    link.href = "src/components/images/resume.pdf";
    link.download = 'Navaneeth_Resume.pdf';
    link.click();
  };

  return (
    <section id="contact" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Get In <span className="text-blue-600">Touch</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Let's connect and discuss opportunities, collaborations, or just have a chat about technology!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-teal-600 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'} p-8 rounded-2xl shadow-lg h-fit`}>
              <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="text-blue-600 mr-4 flex-shrink-0" size={20} />
                  <div>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Email</p>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>mittunavan@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="text-green-600 mr-4 flex-shrink-0" size={20} />
                  <div>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Phone</p>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>+91 95621 53025</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="text-red-600 mr-4 flex-shrink-0" size={20} />
                  <div>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Location</p>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Ottapalam, Palakkad, Kerala, India</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-600">
                <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Connect with me
                </h4>
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/Navaneeth832"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} 
                      transition-colors duration-200`}
                  >
                    <Github size={20} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/navaneeth-krishna-g-904477334/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} 
                      transition-colors duration-200`}
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>

              {/* Resume Download */}
              <div className="mt-8">
                <button
                  onClick={downloadResume}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r 
                    from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 
                    transition-all duration-200 transform hover:scale-105"
                >
                  <Download size={20} />
                  Download Resume
                </button>
                <a
                  href="https://drive.google.com/file/d/1-k3JxNweO7lhsx7TKamX-Pr-d8VrT9Mj/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 mt-3 border-2 
                    border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white 
                    transition-all duration-200 ${darkMode ? 'hover:bg-blue-600' : ''}`}
                >
                  <ExternalLink size={20} />
                  View Online
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'} p-8 rounded-2xl shadow-lg`}>
              <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Send me a message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label 
                      htmlFor="name" 
                      className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
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
                      className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:ring-2 
                        focus:ring-blue-500 focus:border-transparent ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="email" 
                      className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
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
                      className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:ring-2 
                        focus:ring-blue-500 focus:border-transparent ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                <div>
                  <label 
                    htmlFor="message" 
                    className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:ring-2 
                      focus:ring-blue-500 focus:border-transparent resize-none ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Tell me about your project, question, or just say hello!"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r 
                    from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 
                    transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed 
                    disabled:transform-none ${isSubmitting ? 'animate-pulse' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
                
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    Thank you for your message! I'll get back to you soon.
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