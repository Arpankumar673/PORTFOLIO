import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
    getProjects, createProject, updateProject, deleteProject, 
    getSkills, createSkill, deleteSkill, 
    getServices, createService, updateService, deleteService,
    getAbout, updateAbout, getMessages, deleteMessage,
    getSocialLinks, updateSocialLinks,
    uploadResume, uploadProfileImage, getProfileData, updateProfileData, uploadProjectImage,
    getExperience, createExperience, updateExperience, deleteExperience, uploadCompanyLogo,
    getCertificates, createCertificates, updateCertificates, deleteCertificates, uploadCertificateMedia
} from '../lib/services';
import * as Icons from 'lucide-react';

const LayoutGrid = Icons.LayoutGrid || Icons.GridIcon || (() => null);
const Layers = Icons.Layers || Icons.LayersIcon || (() => null);
const User = Icons.User || Icons.UserIcon || (() => null);
const Mail = Icons.Mail || Icons.MailIcon || (() => null);
const LogOut = Icons.LogOut || Icons.LogOutIcon || (() => null);
const Plus = Icons.Plus || Icons.PlusIcon || (() => null);
const Trash2 = Icons.Trash2 || Icons.TrashIcon || (() => null);
const Edit3 = Icons.Edit3 || Icons.EditIcon || (() => null);
const RefreshCcw = Icons.RefreshCcw || Icons.RefreshIcon || (() => null);
const ShieldCheck = Icons.ShieldCheck || Icons.ShieldCheckIcon || (() => null);
const Briefcase = Icons.Briefcase || Icons.BriefcaseIcon || (() => null);
const Cpu = Icons.Cpu || Icons.CpuIcon || (() => null);
const Globe = Icons.Globe || Icons.GlobeIcon || (() => null);
const Camera = Icons.Camera || Icons.CameraIcon || (() => null);
const Twitter = Icons.Twitter || Icons.TwitterIcon || (() => null);
const Github = Icons.Github || Icons.GithubIcon || (() => null);
const Linkedin = Icons.Linkedin || Icons.LinkedinIcon || (() => null);
const Menu = Icons.Menu || Icons.MenuIcon || (() => null);
const FileText = Icons.FileText || Icons.FileTextIcon || (() => null);
const Download = Icons.Download || Icons.DownloadIcon || (() => null);
const ExternalLink = Icons.ExternalLink || Icons.ExternalLinkIcon || (() => null);
const X = Icons.X || Icons.XIcon || (() => null);
const Award = Icons.Award || Icons.AwardIcon || (() => null);
const Calendar = Icons.Calendar || Icons.CalendarIcon || (() => null);
const Link = Icons.Link || Icons.LinkIcon || (() => null);

const AdminDashboard = () => {
    const { logoutUser } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('projects');
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [services, setServices] = useState([]);
    const [about, setAbout] = useState({ title: '', description: '', email: '' });
    const [profile, setProfile] = useState({ image_url: '', role: '' });
    const [messages, setMessages] = useState([]);
    const [socials, setSocials] = useState({ twitter: '', github: '', linkedin: '', email: '' });
    const [experience, setExperience] = useState([]);
    const [certificates, setCertificates] = useState([]);

    // Forms
    const [projectForm, setProjectForm] = useState({ title: '', description: '', tech_stack: '', live_url: '', github_url: '', image_url: '' });
    const [isEditingProj, setIsEditingProj] = useState(false);
    const [currentProjId, setCurrentProjId] = useState(null);

    const [serviceForm, setServiceForm] = useState({ title: '', description: '', icon: 'Code' });
    const [isEditingService, setIsEditingService] = useState(false);
    const [currentServiceId, setCurrentServiceId] = useState(null);

    const [skillForm, setSkillForm] = useState({ name: '', percentage: '80', category: 'Frontend' });

    const [experienceForm, setExperienceForm] = useState({ role: '', company: '', duration: '', description: '', logo_url: '' });
    const [isEditingExp, setIsEditingExp] = useState(false);
    const [currentExpId, setCurrentExpId] = useState(null);

    const [certificateForm, setCertificateForm] = useState({ title: '', issuer: '', date: '', image_url: '', verify_link: '' });
    const [isEditingCert, setIsEditingCert] = useState(false);
    const [currentCertId, setCurrentCertId] = useState(null);

    useEffect(() => {
        fetchData();
        const handleResize = () => { if (window.innerWidth >= 1024) setSidebarOpen(false); };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [p, s, sl, a, m, prof, soc, exp, cert] = await Promise.all([
                getProjects(), getSkills(), getServices(), getAbout(), getMessages(), getProfileData(), getSocialLinks(), getExperience(), getCertificates()
            ]);
            setProjects(p);
            setSkills(s);
            setServices(sl);
            setAbout(a || { title: '', description: '', email: '' });
            setMessages(m);
            setProfile(prof);
            setSocials(soc);
            setExperience(exp);
            setCertificates(cert);
        } catch (err) { console.error("Sync Error: ", err); } 
        finally { setLoading(false); }
    };

    const handleProjectSubmit = async (e) => {
        e.preventDefault();
        try {
            isEditingProj ? await updateProject(currentProjId, projectForm) : await createProject(projectForm);
            setProjectForm({ title: '', description: '', tech_stack: '', live_url: '', github_url: '', image_url: '' });
            setIsEditingProj(false);
            fetchData();
        } catch (err) { alert(err.message); }
    };

    const handleProjectImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try { const url = await uploadProjectImage(file); setProjectForm({ ...projectForm, image_url: url }); } catch (err) { alert(err.message); }
    };

    const handleServiceSubmit = async (e) => {
        e.preventDefault();
        try {
            isEditingService ? await updateService(currentServiceId, serviceForm) : await createService(serviceForm);
            setServiceForm({ title: '', description: '', icon: 'Code' });
            setIsEditingService(false);
            fetchData();
        } catch (err) { alert(err.message); }
    };

    const handleSkillSubmit = async (e) => {
        e.preventDefault();
        try { await createSkill(skillForm); setSkillForm({ name: '', percentage: '80', category: 'Frontend' }); fetchData(); } catch (err) { alert(err.message); }
    };

    const handleProfileSync = async (e) => {
        e.preventDefault();
        try { await updateProfileData(profile); alert("Persona Overwritten."); fetchData(); } catch (err) { alert(err.message); }
    };

    const handleSocialsUpdate = async (e) => {
        e.preventDefault();
        try { await updateSocialLinks(socials); alert("Socials Reconfigured."); fetchData(); } catch (err) { alert(err.message); }
    };

    const handleAboutUpdate = async (e) => {
        e.preventDefault();
        try { await updateAbout(about); alert("Bio Updated."); fetchData(); } catch (err) { alert(err.message); }
    };

    const handleResumeUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.type !== 'application/pdf') return alert("Only PDF files are authorized.");
        if (file.size > 2 * 1024 * 1024) return alert("File exceeds 2MB threshold.");
        
        try {
            setLoading(true);
            await uploadResume(file);
            alert("Resume Uploaded.");
            fetchData();
        } catch (err) { alert(err.message); }
        finally { setLoading(false); }
    };

    const handleResumeDelete = async () => {
        if (!window.confirm("Purge resume data?")) return;
        try {
            await updateAbout({ ...about, resume_url: null });
            alert("Resume Purged.");
            fetchData();
        } catch (err) { alert(err.message); }
    };

    const handleExperienceSubmit = async (e) => {
        e.preventDefault();
        try {
            isEditingExp ? await updateExperience(currentExpId, experienceForm) : await createExperience(experienceForm);
            setExperienceForm({ role: '', company: '', duration: '', description: '', logo_url: '' });
            setIsEditingExp(false);
            fetchData();
        } catch (err) { alert(err.message); }
    };

    const handleCertificateSubmit = async (e) => {
        e.preventDefault();
        try {
            const finalForm = {
                ...certificateForm,
                verify_link: certificateForm.verify_link?.trim() || null
            };
            isEditingCert ? await updateCertificates(currentCertId, finalForm) : await createCertificates(finalForm);
            setCertificateForm({ title: '', issuer: '', date: '', image_url: '', verify_link: '' });
            setIsEditingCert(false);
            fetchData();
        } catch (err) { alert(err.message); }
    };

    const handleLogout = async () => { await logoutUser(); navigate('/'); };

    const NavigationLinks = () => (
        <nav className="flex flex-col gap-4 flex-1">
            {[
                { id: 'projects', icon: <LayoutGrid size={20} />, label: 'Nodes' },
                { id: 'experience', icon: <Briefcase size={20} />, label: 'Chronicle' },
                { id: 'certificates', icon: <Award size={20} />, label: 'Verify' },
                { id: 'services', icon: <Cpu size={20} />, label: 'System' },
                { id: 'skills', icon: <Layers size={20} />, label: 'DNA' },
                { id: 'about', icon: <User size={20} />, label: 'Persona' },
                { id: 'messages', icon: <Mail size={20} />, label: 'Inbox' }
            ].map((tab) => (
                <button 
                  key={tab.id} 
                  onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }} 
                  className={`flex items-center gap-6 px-10 py-5 rounded-3xl font-black uppercase tracking-widest text-[11px] transition-all hover:translate-x-2 ${activeTab === tab.id ? 'bg-accent text-white shadow-glow-orange' : 'text-gray-500 hover:text-white'}`}
                >
                    {tab.icon} {tab.label}
                </button>
            ))}
        </nav>
    );

    return (
        <div className="min-h-screen bg-[#08080c] text-white flex overflow-hidden font-sans select-none">
            {/* Sidebar Shell */}
            <aside className={`fixed lg:relative inset-y-0 left-0 w-80 h-screen glass border-r border-white/5 flex flex-col p-10 z-[100] transition-transform duration-700 overflow-y-auto scrollbar-premium ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="flex flex-col gap-4 mb-20 text-center items-center relative">
                    <ShieldCheck size={32} className="text-accent shadow-glow-orange" />
                    <h1 className="text-2xl font-black uppercase tracking-tighter mt-4 italic">Authority Hub</h1>
                    <button onClick={() => setSidebarOpen(false)} className="absolute -top-4 -right-4 lg:hidden p-4 text-white hover:text-accent transition-all active:scale-90"><X size={28} /></button>
                </div>
                <NavigationLinks />
                <div className="pt-10 border-t border-white/5"><button onClick={handleLogout} className="flex items-center gap-6 px-10 py-5 rounded-3xl font-black uppercase tracking-widest text-[11px] text-red-500 hover:bg-red-500/10 transition-all w-full leading-none"><LogOut size={20} /> Terminate</button></div>
            </aside>

            {/* Block Overlay for mobile when sidebar is open */}
            {sidebarOpen && <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[90] lg:hidden" onClick={() => setSidebarOpen(false)}></div>}

            <main className="flex-1 p-8 md:p-12 lg:p-16 h-screen overflow-y-auto bg-background transition-all duration-700">
                <div className="flex justify-between items-center mb-16 lg:mb-24 gap-4">
                   <div className="flex items-center gap-6">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-16 h-16 glass border border-white/10 rounded-2xl flex items-center justify-center text-white hover:text-accent transition-all active:scale-90"><Menu size={32} /></button>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white drop-shadow-xl line-clamp-1">{activeTab}</h2>
                   </div>
                   <button onClick={fetchData} className="w-14 h-14 md:w-16 md:h-16 glass border border-white/10 rounded-2xl flex items-center justify-center text-white/40 hover:text-accent transition-all duration-700 hover:rotate-180 hover:scale-110 shadow-xl flex-shrink-0">
                       <RefreshCcw size={28} />
                   </button>
                </div>

                {!loading && (
                    <div className="max-w-6xl mx-auto space-y-20 md:space-y-24 animate-in fade-in duration-1000">
                        {/* TAB CONTENT: PROJECTS (NODES) */}
                        {activeTab === 'projects' && (
                            <div className="space-y-12">
                               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {projects.map(p => (
                                        <div key={p.id} className="glass-premium p-8 rounded-[2.5rem] border-white/5 flex flex-col gap-6 relative group hover:bg-accent/5 transition-all">
                                            <div className="aspect-video bg-white/5 rounded-2xl overflow-hidden shadow-2xl">
                                                {p.image_url ? <img src={p.image_url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" /> : <div className="w-full h-full flex items-center justify-center text-white/5 font-black uppercase italic text-xs">Buffer Empty</div>}
                                            </div>
                                            <div className="flex justify-between items-center gap-4">
                                                <h4 className="text-lg font-black uppercase tracking-tighter truncate">{p.title}</h4>
                                                <div className="flex gap-2 flex-shrink-0">
                                                    <button onClick={() => { setProjectForm(p); setIsEditingProj(true); setCurrentProjId(p.id); }} className="w-10 h-10 bg-white/10 hover:bg-accent hover:text-white rounded-full flex items-center justify-center transition-all"><Edit3 size={16} /></button>
                                                    <button onClick={async () => { if(window.confirm('Wipe node?')) { await deleteProject(p.id); fetchData(); } }} className="w-10 h-10 bg-red-500/10 text-red-500 hover:bg-red-500 rounded-full flex items-center justify-center transition-all"><Trash2 size={16} /></button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {projects.length === 0 && <div className="col-span-full py-20 text-center text-white/5 font-black uppercase tracking-[0.5em] italic">No projects stored.</div>}
                               </div>
                               <div className="glass-premium p-8 md:p-12 border-white/5 flex flex-col gap-10 rounded-[3rem] shadow-2xl">
                                    <h3 className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase text-white flex items-center gap-4"><Plus className="text-accent" /> {isEditingProj ? 'Reconfigure Node' : 'Initialize Node'}</h3>
                                    <form onSubmit={handleProjectSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                        <div className="space-y-8 flex flex-col gap-4">
                                            <input type="text" placeholder="PROJECT TITLE" className="w-full bg-transparent border-b border-white/10 py-5 focus:border-accent outline-none text-2xl font-black uppercase" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} required />
                                            <input type="text" placeholder="TECH STACK" className="w-full bg-transparent border-b border-white/10 py-5 focus:border-accent outline-none text-[10px] font-bold uppercase tracking-widest text-accent" value={projectForm.tech_stack} onChange={e => setProjectForm({...projectForm, tech_stack: e.target.value})} required />
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <input type="text" placeholder="LIVE URL" className="bg-white/5 border border-white/5 p-5 rounded-2xl text-[10px] outline-none focus:border-accent font-black tracking-widest" value={projectForm.live_url} onChange={e => setProjectForm({...projectForm, live_url: e.target.value})} />
                                                <input type="text" placeholder="GITHUB URL" className="bg-white/5 border border-white/5 p-5 rounded-2xl text-[10px] outline-none focus:border-accent font-black tracking-widest" value={projectForm.github_url} onChange={e => setProjectForm({...projectForm, github_url: e.target.value})} />
                                            </div>
                                        </div>
                                        <div className="space-y-8 flex flex-col">
                                            <textarea placeholder="PROJECT DESCRIPTION" className="flex-1 bg-white/5 border border-white/5 p-8 rounded-3xl focus:border-accent outline-none text-base font-bold italic resize-none min-h-[160px]" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} required />
                                            <label className="py-5 bg-white/5 border border-white/10 text-center rounded-2xl text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-white/10 transition-all flex items-center justify-center gap-4 relative overflow-hidden">
                                                <Camera size={20} className="text-accent"/> {projectForm.image_url ? 'Overwrite Node Visual' : 'Upload System Meta'}
                                                <input type="file" className="hidden" onChange={handleProjectImage} />
                                            </label>
                                        </div>
                                        <button type="submit" className="col-span-full py-7 bg-white text-background font-black uppercase tracking-[0.5em] rounded-3xl hover:bg-accent hover:text-white transition-all text-xs shadow-glow-orange-lg">
                                            {isEditingProj ? 'CONFIRM MISSION LOGS' : 'INITIALIZE SYSTEM SEQUENCE'}
                                        </button>
                                        {isEditingProj && <button type="button" onClick={() => { setIsEditingProj(false); setProjectForm({ title: '', description: '', tech_stack: '', live_url: '', github_url: '', image_url: '' }); }} className="col-span-full py-3 text-white/30 uppercase font-black text-[10px] hover:text-white transition-all">Cancel Calibration</button>}
                                    </form>
                               </div>
                            </div>
                        )}

                        {/* TAB CONTENT: EXPERIENCE (CHRONICLE) */}
                        {activeTab === 'experience' && (
                            <div className="space-y-12">
                                <div className="space-y-6">
                                    {experience.map(exp => (
                                        <div key={exp.id} className="glass-premium p-8 rounded-[2.5rem] border-white/5 flex flex-col md:flex-row items-center gap-10 hover:bg-accent/[0.03] transition-all">
                                            <div className="w-20 h-20 bg-white/5 rounded-2xl overflow-hidden flex-shrink-0">
                                                {exp.logo_url ? <img src={exp.logo_url} className="w-full h-full object-contain p-2" /> : <Briefcase size={32} className="w-full h-full p-6 text-white/5" />}
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <h4 className="text-xl font-black uppercase tracking-tighter">{exp.role}</h4>
                                                <p className="text-accent text-[10px] font-black uppercase tracking-[0.2em]">{exp.company} • {exp.duration}</p>
                                                <p className="text-white/30 text-xs font-bold italic line-clamp-2">{exp.description}</p>
                                            </div>
                                            <div className="flex gap-4">
                                                <button onClick={() => { setExperienceForm(exp); setIsEditingExp(true); setCurrentExpId(exp.id); }} className="p-4 bg-white/10 hover:bg-accent hover:text-white rounded-xl transition-all"><Edit3 size={16} /></button>
                                                <button onClick={async () => { if(window.confirm('Wipe timeline node?')) { await deleteExperience(exp.id); fetchData(); } }} className="p-4 bg-red-500/10 text-red-500 hover:bg-red-500 rounded-xl transition-all"><Trash2 size={16} /></button>
                                            </div>
                                        </div>
                                    ))}
                                    {experience.length === 0 && <div className="py-20 text-center text-white/5 font-black uppercase tracking-[0.5em] italic">No experiences logged.</div>}
                                </div>
                                <div className="glass-premium p-8 md:p-12 border-white/5 rounded-[3rem] shadow-2xl">
                                    <h3 className="text-2xl font-black italic tracking-tighter uppercase text-white mb-10 flex items-center gap-4"><Briefcase className="text-accent" /> {isEditingExp ? 'Recalibrate Timeline' : 'Initialize Timeline'}</h3>
                                    <form onSubmit={handleExperienceSubmit} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <input type="text" placeholder="ROLE TITLE" className="bg-transparent border-b border-white/10 py-5 focus:border-accent outline-none text-2xl font-black uppercase text-white" value={experienceForm.role} onChange={e => setExperienceForm({...experienceForm, role: e.target.value})} required />
                                            <input type="text" placeholder="COMPANY NAME" className="bg-transparent border-b border-white/10 py-5 focus:border-accent outline-none text-2xl font-black uppercase text-white" value={experienceForm.company} onChange={e => setExperienceForm({...experienceForm, company: e.target.value})} required />
                                            <input type="text" placeholder="DURATION (e.g. Jan 2024 - Present)" className="bg-transparent border-b border-white/10 py-5 focus:border-accent outline-none text-[10px] font-black tracking-widest uppercase text-accent" value={experienceForm.duration} onChange={e => setExperienceForm({...experienceForm, duration: e.target.value})} required />
                                            <label className="py-5 bg-white/5 border border-white/10 text-center rounded-2xl text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-white/10 transition-all flex items-center justify-center gap-4 relative overflow-hidden">
                                                <Camera size={20} className="text-accent"/> {experienceForm.logo_url ? 'Overwrite Logo' : 'Upload Company Logo'}
                                                <input type="file" className="hidden" onChange={async (e) => { const url = await uploadCompanyLogo(e.target.files[0]); setExperienceForm({...experienceForm, logo_url: url}); }} />
                                            </label>
                                        </div>
                                        <textarea placeholder="EXPERIENCE DESCRIPTION" className="w-full bg-white/5 border border-white/5 p-8 rounded-3xl focus:border-accent outline-none text-base font-bold italic resize-none min-h-[140px]" value={experienceForm.description} onChange={e => setExperienceForm({...experienceForm, description: e.target.value})} required />
                                        <button type="submit" className="w-full py-7 bg-white text-background font-black uppercase tracking-[0.5em] rounded-3xl hover:bg-accent hover:text-white transition-all text-xs shadow-glow-orange-lg">
                                            {isEditingExp ? 'CONFIRM TIMELINE UPDATE' : 'DEPLOY TIMELINE NODE'}
                                        </button>
                                        {isEditingExp && <button type="button" onClick={() => { setIsEditingExp(false); setExperienceForm({ role: '', company: '', duration: '', description: '', logo_url: '' }); }} className="w-full py-3 text-white/30 uppercase font-black text-[10px] hover:text-white transition-all">Cancel Calibration</button>}
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* TAB CONTENT: CERTIFICATES (VERIFY) */}
                        {activeTab === 'certificates' && (
                            <div className="space-y-12">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {certificates.map(cert => (
                                        <div key={cert.id} className="glass-premium p-8 rounded-[2.5rem] border-white/5 flex flex-col gap-6 hover:bg-accent/5 transition-all group">
                                            <div className="aspect-[4/3] bg-white/5 rounded-2xl overflow-hidden relative">
                                                {cert.image_url ? <img src={cert.image_url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" /> : <div className="w-full h-full flex items-center justify-center text-white/5 font-black uppercase italic text-[10px]">Binary Empty</div>}
                                                <div className="absolute top-4 right-4 flex gap-2">
                                                    <button onClick={() => { setCertificateForm(cert); setIsEditingCert(true); setCurrentCertId(cert.id); }} className="w-10 h-10 bg-black/50 backdrop-blur-md hover:bg-accent text-white rounded-full flex items-center justify-center transition-all"><Edit3 size={16} /></button>
                                                    <button onClick={async () => { if(window.confirm('Wipe document?')) { await deleteCertificates(cert.id); fetchData(); } }} className="w-10 h-10 bg-black/50 backdrop-blur-md hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-all"><Trash2 size={16} /></button>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="text-lg font-black uppercase tracking-tighter truncate">{cert.title}</h4>
                                                <p className="text-accent text-[9px] font-black uppercase tracking-widest">{cert.issuer} • {cert.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {certificates.length === 0 && <div className="col-span-full py-20 text-center text-white/5 font-black uppercase tracking-[0.5em] italic">No certificates archived.</div>}
                                </div>
                                <div className="glass-premium p-8 md:p-12 border-white/5 rounded-[3rem] shadow-2xl">
                                    <h3 className="text-2xl font-black italic tracking-tighter uppercase text-white mb-10 flex items-center gap-4"><Award className="text-accent" /> {isEditingCert ? 'Recalibrate Document' : 'Initialize Document'}</h3>
                                    <form onSubmit={handleCertificateSubmit} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <input type="text" placeholder="CERTIFICATE TITLE" className="bg-transparent border-b border-white/10 py-5 focus:border-accent outline-none text-2xl font-black uppercase text-white" value={certificateForm.title} onChange={e => setCertificateForm({...certificateForm, title: e.target.value})} required />
                                            <input type="text" placeholder="ISSUED BY" className="bg-transparent border-b border-white/10 py-5 focus:border-accent outline-none text-2xl font-black uppercase text-white" value={certificateForm.issuer} onChange={e => setCertificateForm({...certificateForm, issuer: e.target.value})} required />
                                            <input type="text" placeholder="DATE (e.g. March 2024)" className="bg-transparent border-b border-white/10 py-5 focus:border-accent outline-none text-[10px] font-black tracking-widest uppercase text-accent" value={certificateForm.date} onChange={e => setCertificateForm({...certificateForm, date: e.target.value})} required />
                                            <input type="text" placeholder="VERIFICATION LINK (OPTIONAL)" className="bg-white/5 border border-white/5 p-5 rounded-2xl text-[10px] outline-none focus:border-accent font-black tracking-widest" value={certificateForm.verify_link} onChange={e => setCertificateForm({...certificateForm, verify_link: e.target.value})} />
                                            <label className="col-span-full py-5 bg-white/5 border border-white/10 text-center rounded-2xl text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-white/10 transition-all flex items-center justify-center gap-4 relative overflow-hidden">
                                                <FileText size={20} className="text-accent"/> {certificateForm.image_url ? 'Overwrite Document Visual' : 'Upload Certificate Binary (Image/PDF)'}
                                                <input type="file" className="hidden" onChange={async (e) => { const url = await uploadCertificateMedia(e.target.files[0]); setCertificateForm({...certificateForm, image_url: url}); }} />
                                            </label>
                                        </div>
                                        <button type="submit" className="w-full py-7 bg-white text-background font-black uppercase tracking-[0.5em] rounded-3xl hover:bg-accent hover:text-white transition-all text-xs shadow-glow-orange-lg">
                                            {isEditingCert ? 'CONFIRM DOCUMENT UPDATE' : 'DEPLOY DOCUMENT NODE'}
                                        </button>
                                        {isEditingCert && <button type="button" onClick={() => { setIsEditingCert(false); setCertificateForm({ title: '', issuer: '', date: '', image_url: '', verify_link: '' }); }} className="w-full py-3 text-white/30 uppercase font-black text-[10px] hover:text-white transition-all">Cancel Calibration</button>}
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* TAB CONTENT: SERVICES (SYSTEM) */}
                        {activeTab === 'services' && (
                            <div className="space-y-12">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {services.map(s => (
                                        <div key={s.id} className="glass-premium p-8 rounded-[2.5rem] border-white/5 flex flex-col gap-6 relative hover:bg-accent/5 transition-all">
                                            <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center text-accent shadow-glow-orange">
                                                <Cpu size={24} />
                                            </div>
                                            <h4 className="text-lg font-black uppercase tracking-tighter">{s.title}</h4>
                                            <p className="text-white/30 text-xs font-bold italic line-clamp-3">{s.description}</p>
                                            <div className="flex gap-4 mt-4">
                                                <button onClick={() => { setServiceForm(s); setIsEditingService(true); setCurrentServiceId(s.id); }} className="p-4 bg-white/10 hover:bg-accent hover:text-white rounded-xl transition-all"><Edit3 size={16} /></button>
                                                <button onClick={async () => { if(window.confirm('Wipe system?')) { await deleteService(s.id); fetchData(); } }} className="p-4 bg-red-500/10 text-red-500 hover:bg-red-500 rounded-xl transition-all"><Trash2 size={16} /></button>
                                            </div>
                                        </div>
                                    ))}
                                    {services.length === 0 && <div className="col-span-full py-20 text-center text-white/5 font-black uppercase tracking-[0.5em] italic">No systems online.</div>}
                                </div>
                                <div className="glass-premium p-8 md:p-12 border-white/5 rounded-[3rem] shadow-2xl">
                                    <h3 className="text-2xl font-black italic tracking-tighter uppercase text-white mb-10 flex items-center gap-4"><Cpu className="text-accent" /> {isEditingService ? 'Recalibrate System' : 'Initialize System'}</h3>
                                    <form onSubmit={handleServiceSubmit} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <input type="text" placeholder="SERVICE TITLE" className="bg-transparent border-b border-white/10 py-5 focus:border-accent outline-none text-2xl font-black uppercase text-white" value={serviceForm.title} onChange={e => setServiceForm({...serviceForm, title: e.target.value})} required />
                                            <select className="bg-white/5 border border-white/10 p-5 rounded-2xl text-[10px] font-black tracking-widest outline-none focus:border-accent" value={serviceForm.icon} onChange={e => setServiceForm({...serviceForm, icon: e.target.value})}>
                                                <option value="Code">Code</option>
                                                <option value="Globe">Globe</option>
                                                <option value="Cpu">Cpu</option>
                                                <option value="Layers">Layers</option>
                                            </select>
                                        </div>
                                        <textarea placeholder="SYSTEM CAPABILITIES" className="w-full bg-white/5 border border-white/5 p-8 rounded-3xl focus:border-accent outline-none text-base font-bold italic resize-none min-h-[140px]" value={serviceForm.description} onChange={e => setServiceForm({...serviceForm, description: e.target.value})} required />
                                        <button type="submit" className="w-full py-7 bg-white text-background font-black uppercase tracking-[0.5em] rounded-3xl hover:bg-accent hover:text-white transition-all text-xs shadow-glow-orange-lg">
                                            {isEditingService ? 'CONFIRM SYSTEM UPDATE' : 'DEPLOY SYSTEM NODE'}
                                        </button>
                                        {isEditingService && <button type="button" onClick={() => { setIsEditingService(false); setServiceForm({ title: '', description: '', icon: 'Code' }); }} className="w-full py-3 text-white/30 uppercase font-black text-[10px] hover:text-white transition-all">Cancel Calibration</button>}
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* TAB CONTENT: SKILLS (DNA) */}
                        {activeTab === 'skills' && (
                            <div className="space-y-12">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {skills.map(s => (
                                        <div key={s.id} className="glass-premium p-6 rounded-3xl border-white/5 flex flex-col gap-4 relative group hover:scale-[1.02] transition-all">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-accent">{s.name}</span>
                                                <button onClick={async () => { if(window.confirm('Delete gene?')) { await deleteSkill(s.id); fetchData(); } }} className="p-2 text-white/10 hover:text-red-500 transition-colors"><Trash2 size={12} /></button>
                                            </div>
                                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full bg-accent shadow-glow-orange transition-all duration-1000" style={{ width: `${s.percentage}%` }}></div>
                                            </div>
                                            <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest self-end">{s.percentage}% Mastered</span>
                                        </div>
                                    ))}
                                    {skills.length === 0 && <div className="col-span-full py-20 text-center text-white/5 font-black uppercase tracking-[0.5em] italic">No genetic sequences found.</div>}
                                </div>
                                <div className="glass-premium p-8 md:p-12 border-white/5 rounded-[3rem] shadow-2xl">
                                    <h3 className="text-2xl font-black italic tracking-tighter uppercase text-white mb-10 flex items-center gap-4"><Layers className="text-accent" /> Splice DNA</h3>
                                    <form onSubmit={handleSkillSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Sequence Name</label>
                                            <input type="text" placeholder="SKILL NAME" className="w-full bg-white/5 border border-white/5 p-5 rounded-2xl focus:border-accent outline-none font-bold text-white uppercase text-xs" value={skillForm.name} onChange={e => setSkillForm({...skillForm, name: e.target.value})} required />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Mastery %: {skillForm.percentage}</label>
                                            <input type="range" className="w-full accent-accent" min="0" max="100" value={skillForm.percentage} onChange={e => setSkillForm({...skillForm, percentage: e.target.value})} />
                                        </div>
                                        <button type="submit" className="py-5 bg-white text-background font-black uppercase tracking-[0.5em] rounded-2xl hover:bg-accent hover:text-white transition-all text-[10px] shadow-glow-orange-lg">SPLICE SEQUENCE</button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* TAB CONTENT: ABOUT (PERSONA) */}
                        {activeTab === 'about' && (
                             <div className="space-y-16">
                                <div className="glass-premium p-10 flex flex-col lg:flex-row items-center gap-12 rounded-[3.5rem] border-white/5 shadow-2xl">
                                    <div className="relative">
                                        <div className="w-48 h-48 md:w-64 md:h-64 profile-glow p-2 transform -rotate-3 hover:rotate-0 transition-transform duration-700 shadow-glow-orange-lg">
                                            <img src={profile.image_url || 'https://via.placeholder.com/300'} alt="Dossier" className="w-full h-full object-cover rounded-full" />
                                        </div>
                                        <label className="absolute bottom-4 right-4 w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-glow-orange border-4 border-background">
                                            <Camera size={24} />
                                            <input type="file" className="hidden" accept="image/*" onChange={async (e) => { await uploadProfileImage(e.target.files[0]); fetchData(); }} />
                                        </label>
                                    </div>
                                    <div className="flex-1 w-full space-y-6">
                                        <h3 className="text-2xl font-black uppercase text-center lg:text-left">Dossier Carrier Title</h3>
                                        <form onSubmit={handleProfileSync} className="flex flex-col gap-4">
                                            <input type="text" className="w-full bg-white/5 border border-white/10 py-5 px-8 rounded-2xl focus:border-accent outline-none text-2xl lg:text-3xl font-black italic text-accent text-center lg:text-left" value={profile.role} onChange={e => setProfile({...profile, role: e.target.value})} />
                                            <button type="submit" className="py-4 bg-white text-background font-black uppercase tracking-[0.5em] rounded-2xl hover:bg-accent hover:text-white transition-all text-xs">Transmit Protocol</button>
                                        </form>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                    {/* Persona Narrative */}
                                    <div className="glass-premium p-10 rounded-[3rem] border-white/5 shadow-2xl space-y-8">
                                        <h4 className="text-xl font-black uppercase tracking-widest text-white/40 flex items-center gap-4"><Briefcase size={20} className="text-accent" /> Narrative Data</h4>
                                        <form onSubmit={handleAboutUpdate} className="space-y-6">
                                            <textarea className="w-full bg-white/5 border border-white/10 p-8 rounded-3xl min-h-[250px] outline-none focus:border-accent text-white font-bold italic leading-relaxed" value={about.description} onChange={e => setAbout({...about, description: e.target.value})} placeholder="ENTERING NARRATIVE..."></textarea>
                                            <button type="submit" className="w-full py-5 bg-accent text-white font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] shadow-glow-orange transition-all text-xs">Sync Narrative</button>
                                        </form>
                                    </div>

                                    {/* Connectivity Channels */}
                                    <div className="glass-premium p-10 rounded-[3rem] border-white/5 shadow-2xl space-y-8">
                                        <h4 className="text-xl font-black uppercase tracking-widest text-white/40 flex items-center gap-4"><Globe size={20} className="text-accent" /> Social Links</h4>
                                        <form onSubmit={handleSocialsUpdate} className="space-y-6">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-4 px-6 py-4 bg-white/5 rounded-2xl border border-white/5 focus-within:border-accent group transition-all">
                                                    <Github size={18} className="text-white/20 group-focus-within:text-accent" />
                                                    <input type="text" className="bg-transparent border-none outline-none flex-1 text-[11px] font-black tracking-widest uppercase" placeholder="GITHUB URL" value={socials.github} onChange={e => setSocials({...socials, github: e.target.value})} />
                                                </div>
                                                <div className="flex items-center gap-4 px-6 py-4 bg-white/5 rounded-2xl border border-white/5 focus-within:border-accent group transition-all">
                                                    <Linkedin size={18} className="text-white/20 group-focus-within:text-accent" />
                                                    <input type="text" className="bg-transparent border-none outline-none flex-1 text-[11px] font-black tracking-widest uppercase" placeholder="LINKEDIN URL" value={socials.linkedin} onChange={e => setSocials({...socials, linkedin: e.target.value})} />
                                                </div>
                                                <div className="flex items-center gap-4 px-6 py-4 bg-white/5 rounded-2xl border border-white/5 focus-within:border-accent group transition-all">
                                                    <Twitter size={18} className="text-white/20 group-focus-within:text-accent" />
                                                    <input type="text" className="bg-transparent border-none outline-none flex-1 text-[11px] font-black tracking-widest uppercase" placeholder="TWITTER URL" value={socials.twitter} onChange={e => setSocials({...socials, twitter: e.target.value})} />
                                                </div>
                                                <div className="flex items-center gap-4 px-6 py-4 bg-white/5 rounded-2xl border border-white/5 focus-within:border-accent group transition-all">
                                                    <Mail size={18} className="text-white/20 group-focus-within:text-accent" />
                                                    <input type="email" className="bg-transparent border-none outline-none flex-1 text-[11px] font-black tracking-widest uppercase" placeholder="CONTACT EMAIL" value={socials.email} onChange={e => setSocials({...socials, email: e.target.value})} />
                                                </div>
                                            </div>
                                            <button type="submit" className="w-full py-5 bg-white text-background font-black uppercase tracking-widest rounded-2xl hover:bg-accent hover:text-white transition-all text-xs">Synchronize Channels</button>
                                        </form>
                                    </div>

                                    {/* Resume Management */}
                                    <div className="glass-premium p-10 rounded-[3rem] border-white/5 shadow-2xl space-y-8 col-span-full">
                                        <h4 className="text-xl font-black uppercase tracking-widest text-white/40 flex items-center gap-4"><FileText size={20} className="text-accent" /> Resume Meta-Data</h4>
                                        <div className="flex flex-col md:flex-row items-center gap-10">
                                            <label className="flex-1 w-full py-10 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-accent hover:bg-accent/5 transition-all group">
                                                <Download size={32} className="text-white/20 group-hover:text-accent transition-colors" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 group-hover:text-white">Upload PDF Binary</span>
                                                <input type="file" className="hidden" accept=".pdf" onChange={handleResumeUpload} />
                                            </label>
                                            {about.resume_url && (
                                                <div className="flex flex-col gap-4 w-full md:w-auto">
                                                    <a href={about.resume_url} target="_blank" rel="noreferrer" className="px-8 py-5 bg-accent text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 shadow-glow-orange hover:scale-105 transition-all text-center">
                                                        Preview <ExternalLink size={14} />
                                                    </a>
                                                    <button onClick={handleResumeDelete} className="px-8 py-5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-red-500 hover:text-white transition-all">
                                                        Purge File
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                             </div>
                        )}

                        {/* TAB CONTENT: MESSAGES (INBOX) */}
                        {activeTab === 'messages' && (
                            <div className="space-y-12">
                                <div className="grid grid-cols-1 gap-6">
                                    {messages.length === 0 ? (
                                        <div className="glass-premium p-20 rounded-[3rem] text-center space-y-6">
                                            <Mail size={64} className="mx-auto text-white/5" />
                                            <p className="text-xl font-black uppercase tracking-[0.5em] text-white/20 italic">No Intercepted Signals</p>
                                        </div>
                                    ) : (
                                        messages.map(m => (
                                            <div key={m.id} className="glass-premium p-10 rounded-[2.5rem] border-white/5 flex flex-col md:flex-row gap-10 hover:bg-accent/[0.03] transition-all relative overflow-hidden group">
                                                <div className="flex flex-col gap-4 flex-1">
                                                    <div className="flex flex-wrap items-center gap-4">
                                                        <span className="px-5 py-2 bg-accent text-white font-black uppercase tracking-widest text-[9px] rounded-full">{m.subject}</span>
                                                        <span className="text-[10px] font-bold text-white/30 italic uppercase tracking-widest">{new Date(m.created_at).toLocaleString()}</span>
                                                    </div>
                                                    <h4 className="text-2xl font-black uppercase tracking-tighter">{m.name}</h4>
                                                    <p className="text-accent text-[11px] font-black uppercase tracking-widest mb-4">{m.email}</p>
                                                    <p className="text-white/60 font-medium leading-relaxed bg-white/5 p-8 rounded-3xl italic">{m.message}</p>
                                                </div>
                                                <div className="flex md:flex-col justify-end gap-4">
                                                    <button onClick={async () => { if(window.confirm('Delete signal?')) { await deleteMessage(m.id); fetchData(); } }} className="w-16 h-16 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-3xl flex items-center justify-center transition-all shadow-xl"><Trash2 size={24} /></button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
