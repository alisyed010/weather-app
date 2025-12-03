import React, { useState } from 'react';
import { Send, Mail, User, MessageSquare } from 'lucide-react';
import { USER_DETAILS } from '../constants';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Weather App Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    // Open default mail client
    window.location.href = `mailto:${USER_DETAILS.EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-slate-900/80 to-blue-950/80 backdrop-blur-2xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl animate-slide-up mb-12 overflow-hidden relative" style={{ animationDelay: '0.4s' }}>
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

      <div className="flex flex-col md:flex-row gap-12 relative z-10">
        
        {/* Info Side */}
        <div className="md:w-1/3 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Let's Talk
          </h2>
          <p className="text-blue-200/80 mb-8 leading-relaxed">
            Have suggestions for WEATHER FORECAST? Found a bug? Or just want to say hi? I'd love to hear from you.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-blue-200">
               <div className="p-2 bg-white/10 rounded-lg">
                 <User className="w-5 h-5" />
               </div>
               <span className="font-medium">{USER_DETAILS.NAME}</span>
            </div>
            <div className="flex items-center space-x-3 text-blue-200">
               <div className="p-2 bg-white/10 rounded-lg">
                 <Mail className="w-5 h-5" />
               </div>
               <span className="font-medium">{USER_DETAILS.EMAIL}</span>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="md:w-2/3 bg-white/5 p-8 rounded-3xl border border-white/5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative group">
                <User className="absolute top-4 left-4 w-5 h-5 text-blue-300 group-focus-within:text-white transition-colors" />
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-black/20 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-white/5 text-white placeholder-blue-200/30 transition-all"
                />
              </div>
              <div className="relative group">
                <Mail className="absolute top-4 left-4 w-5 h-5 text-blue-300 group-focus-within:text-white transition-colors" />
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-black/20 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-white/5 text-white placeholder-blue-200/30 transition-all"
                />
              </div>
            </div>
            
            <div className="relative group">
              <MessageSquare className="absolute top-4 left-4 w-5 h-5 text-blue-300 group-focus-within:text-white transition-colors" />
              <textarea
                required
                placeholder="How can I help you?"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-black/20 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-white/5 text-white placeholder-blue-200/30 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Send Message</span>
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;