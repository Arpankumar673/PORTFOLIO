import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import { sendMessage } from '../lib/services';

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastSent, setLastSent] = useState(0);

  // Security: Anti-XSS Sanitization
  const sanitize = (str) => str.replace(/[<>]/g, (tag) => ({ '<': '&lt;', '>': '&gt;' }[tag] || tag));

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Honeypot check (Bot protection)
    if (honeypot) {
        console.warn("Bot detected via honeypot.");
        return;
    }

    // 2. Rate Limiting (15-second cooldown)
    const now = Date.now();
    if (now - lastSent < 15000) {
        alert("Transmission cooldown active. Please wait 15 seconds.");
        return;
    }

    // 3. Validation
    if (!formData.email.includes('@') || formData.message.length < 10) {
        alert("Please provide a valid email and detailed message.");
        return;
    }

    setLoading(true);

    try {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        // 4. Send via EmailJS
        await emailjs.sendForm(
            serviceId,
            templateId,
            formRef.current,
            publicKey
        );

        // 5. Send via Supabase (Back-end Log)
        await sendMessage({
            name: sanitize(formData.name),
            email: sanitize(formData.email),
            subject: sanitize(formData.subject),
            message: sanitize(formData.message)
        });

        setLastSent(now);
        setFormData({ name: '', email: '', subject: '', message: '' });
        // No success alert as per current minimal design - silent success
    } catch (err) {
        if (!import.meta.env.PROD) console.error("Signal Failed: ", err);
    } finally {
        setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-background relative overflow-hidden flex flex-col items-center px-6">
      <div className="container mx-auto max-w-4xl z-10 w-full flex flex-col items-center">
        <div className="flex flex-col mb-16 items-center text-center">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tighter uppercase whitespace-nowrap italic leading-tight text-white italic">
                Contact <span className="text-accent underline underline-offset-8 decoration-4 drop-shadow-[0_0_15px_rgba(255,94,0,0.4)]">Me</span>
            </h2>
            <p className="text-xs md:text-sm text-white/20 uppercase tracking-[0.4em] font-black italic">Turning complex ideas into simple, powerful solutions</p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="w-full space-y-10">
            {/* Honeypot Field (Hidden from humans) */}
            <input 
                type="text" 
                name="hp_field" 
                style={{ display: 'none' }} 
                tabIndex="-1" 
                autoComplete="off" 
                value={honeypot} 
                onChange={(e) => setHoneypot(e.target.value)} 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="group">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/10 mb-3 block">Full Name</label>
                    <input name="user_name" type="text" className="w-full bg-white/5 border border-white/5 py-5 px-6 rounded-2xl focus:border-accent outline-none text-xl font-bold italic text-white transition-all shadow-xl placeholder:text-sm md:placeholder:text-base" placeholder="John Doe" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="group">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/10 mb-3 block">Email Address</label>
                    <input name="user_email" type="email" className="w-full bg-white/5 border border-white/5 py-5 px-6 rounded-2xl focus:border-accent outline-none text-xl font-bold italic text-white transition-all shadow-xl placeholder:text-sm md:placeholder:text-base" placeholder="example@email.com" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
            </div>
            
            <div className="group">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/10 mb-3 block">Subject</label>
                <input name="subject" type="text" className="w-full bg-white/5 border border-white/5 py-5 px-6 rounded-2xl focus:border-accent outline-none text-xl font-bold italic text-white transition-all shadow-xl placeholder:text-sm md:placeholder:text-base" placeholder="What is this about?" required value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} />
            </div>

            <div className="group">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/10 mb-3 block">Your Message</label>
                <textarea name="message" rows="6" className="w-full bg-white/5 border border-white/5 py-6 px-8 rounded-[2rem] focus:border-accent outline-none text-xl font-bold italic text-white transition-all resize-none shadow-xl placeholder:text-sm md:placeholder:text-base" placeholder="Write your message here..." required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
            </div>
            
            <div className="flex justify-center pt-6">
                <button type="submit" disabled={loading} className="btn-orange w-fit px-14 sm:px-20 py-6 text-xl font-black uppercase tracking-[0.5em] shadow-glow-orange hover:shadow-glow-orange-lg transition-all duration-300 transform active:scale-95 leading-none">
                    {loading ? 'TRANSMITTING...' : 'SEND MESSAGE'}
                </button>
            </div>
        </form>
      </div>

      <div className="glow-blob top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.02] pointer-events-none"></div>
    </section>
  );
};

export default Contact;
