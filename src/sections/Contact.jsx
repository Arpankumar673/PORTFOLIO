import React, { useState } from 'react';
import { sendMessage } from '../lib/services';
import * as Icons from 'lucide-react';

const Send = Icons.Send || Icons.SendIcon || (() => null);
const Mail = Icons.Mail || Icons.MailIcon || (() => null);
const MapPin = Icons.MapPin || Icons.MapPinIcon || (() => null);
const Twitter = Icons.Twitter || Icons.TwitterIcon || Icons.X || (() => null);
const Github = Icons.Github || Icons.GithubIcon || Icons.GitHub || (() => null);
const Linkedin = Icons.Linkedin || Icons.LinkedinIcon || Icons.LinkedIn || (() => null);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', msg: '' });

    try {
      await sendMessage(formData);
      setStatus({ type: 'success', msg: 'Your message has been received! I will contact you soon.' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', msg: 'Something went wrong. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px] -z-10 translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Left Side: Text/Info */}
          <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6 italic">Connect with me</span>
              <h2 className="text-6xl md:text-9xl font-black mb-10 tracking-tighter uppercase gradient-text h-32 md:h-48 leading-tight">Drop <br /> a Line</h2>
              
              <div className="space-y-12">
                 <div className="flex items-center gap-8 group">
                    <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center group-hover:bg-primary/20 hover:scale-110 active:scale-95 transition-all duration-500 border border-white/5">
                       <Mail size={32} className="text-primary group-hover:animate-bounce" />
                    </div>
                    <div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-white/30 italic">Email Address</span>
                       <p className="text-xl font-bold tracking-tight">hello@arpan.dev</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-8 group">
                    <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center group-hover:bg-accent/20 hover:scale-110 active:scale-95 transition-all duration-500 border border-white/5">
                       <MapPin size={32} className="text-accent group-hover:animate-pulse" />
                    </div>
                    <div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-white/30 italic">Location</span>
                       <p className="text-xl font-bold tracking-tight">Worldwide Remote</p>
                    </div>
                 </div>
              </div>

              <div className="mt-20 flex items-center gap-6">
                 <a href="#" className="p-4 bg-white/5 rounded-full hover:bg-white inline-block hover:text-dark hover:-translate-y-2 transition-all duration-500 border border-white/10"><Twitter size={24} /></a>
                 <a href="#" className="p-4 bg-white/5 rounded-full hover:bg-white inline-block hover:text-dark hover:-translate-y-2 transition-all duration-500 border border-white/10"><Github size={24} /></a>
                 <a href="#" className="p-4 bg-white/5 rounded-full hover:bg-white inline-block hover:text-dark hover:-translate-y-2 transition-all duration-500 border border-white/10"><Linkedin size={24} /></a>
              </div>
          </div>

          {/* Right Side: Form */}
          <div className="glass-card p-12 lg:p-16 relative overflow-hidden border-white/10 group-hover:border-primary/50 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[80px] -z-10 group-hover:bg-primary/40 transition-all"></div>
              
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="group/field relative">
                   <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4 group-focus-within/field:text-primary transition-colors italic">Full Name</label>
                   <input 
                     type="text" 
                     className="w-full bg-white/5 border-b border-white/10 bg-transparent px-0 py-4 focus:outline-none focus:border-primary transition-all text-xl font-bold" 
                     placeholder="John Doe"
                     required
                     value={formData.name}
                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                   />
                </div>

                <div className="group/field relative">
                   <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4 group-focus-within/field:text-primary transition-colors italic">Email Address</label>
                   <input 
                     type="email" 
                     className="w-full bg-white/5 border-b border-white/10 bg-transparent px-0 py-4 focus:outline-none focus:border-primary transition-all text-xl font-bold" 
                     placeholder="john@example.com"
                     required
                     value={formData.email}
                     onChange={(e) => setFormData({...formData, email: e.target.value})}
                   />
                </div>

                <div className="group/field relative">
                   <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4 group-focus-within/field:text-primary transition-colors italic">Message Details</label>
                   <textarea 
                     rows="4" 
                     className="w-full bg-white/5 border-b border-white/10 bg-transparent px-0 py-4 focus:outline-none focus:border-primary transition-all text-xl font-bold resize-none" 
                     placeholder="Let's build something cool..."
                     required 
                     value={formData.message} 
                     onChange={(e) => setFormData({...formData, message: e.target.value})} 
                   />
                </div>

                {status.msg && (
                  <div className={`p-6 rounded-2xl text-xs font-black uppercase tracking-widest animate-in fade-in slide-in-from-top-4 duration-500
                    ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                    {status.msg}
                  </div>
                )}

                <button 
                   type="submit" 
                   disabled={loading} 
                   className="w-full py-6 bg-white text-dark font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-primary hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 disabled:opacity-50 group/button shadow-2xl shadow-primary/10"
                >
                  {loading ? 'Transmitting...' : 'Send Message'}
                  {!loading && <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />}
                </button>
              </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
