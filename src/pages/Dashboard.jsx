import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
    getProjects, createProject, deleteProject, 
    getSkills, createSkill, deleteSkill, 
    getAbout, updateAbout, getMessages, deleteMessage,
    uploadResume 
} from '../lib/services';
import * as Icons from 'lucide-react';

const LayoutGrid = Icons.LayoutGrid || Icons.GridIcon || (() => null);
const Layers = Icons.Layers || Icons.LayersIcon || (() => null);
const User = Icons.User || Icons.UserIcon || (() => null);
const Mail = Icons.Mail || Icons.MailIcon || (() => null);
const LogOut = Icons.LogOut || Icons.LogOutIcon || (() => null);
const Plus = Icons.Plus || Icons.PlusIcon || (() => null);
const Trash2 = Icons.Trash2 || Icons.TrashIcon || (() => null);
const Edit = Icons.Edit || Icons.EditIcon || (() => null);
const Save = Icons.Save || Icons.SaveIcon || (() => null);
const RefreshCcw = Icons.RefreshCcw || Icons.RefreshIcon || (() => null);
const FileText = Icons.FileText || Icons.FileIcon || (() => null);

const Dashboard = () => {
    const { logoutUser, user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('projects');
    const [loading, setLoading] = useState(true);

    // Form data
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [about, setAbout] = useState({ title: '', description: '', email: '' });
    const [messages, setMessages] = useState([]);

    // Add forms
    const [newProject, setNewProject] = useState({ title: '', description: '', live_url: '', github_url: '', tech_stack: '' });
    const [newSkill, setNewSkill] = useState({ name: '', category: 'Frontend', percentage: 80 });

    useEffect(() => {
        if (!user && !authLoading) return;
        fetchData();
    }, [user, authLoading]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [p, s, a, m] = await Promise.all([getProjects(), getSkills(), getAbout(), getMessages()]);
            setProjects(p);
            setSkills(s);
            setAbout(a);
            setMessages(m);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) return <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-6 text-white text-4xl font-black italic">VERIFYING...</div>;
    if (!user) return <Navigate to="/login" />;

    const handleLogout = async () => {
        await logoutUser();
        navigate('/login');
    };

    const handleAboutUpdate = async (e) => {
        e.preventDefault();
        try {
           await updateAbout(about);
           alert("About Updated Successfully!");
        } catch (err) { alert(err.message); }
    };

    const handleProjectCreate = async (e) => {
        e.preventDefault();
        try {
            await createProject(newProject);
            setNewProject({ title: '', description: '', live_url: '', github_url: '', tech_stack: '' });
            fetchData();
        } catch (err) { alert(err.message); }
    };

    const handleSkillCreate = async (e) => {
        e.preventDefault();
        try {
            await createSkill(newSkill);
            setNewSkill({ name: '', category: 'Frontend', percentage: 80 });
            fetchData();
        } catch (err) { alert(err.message); }
    };

    const handleResumeUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const url = await uploadResume(file);
            alert("Resume Uploaded! URL: " + url);
            fetchData();
        } catch (err) { alert(err.message); }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-80 h-screen glass border-r border-white/5 flex flex-col p-10 z-50 fixed left-0 top-0">
                <div className="flex flex-col gap-4 mb-20 text-center">
                    <h1 className="text-3xl font-black gradient-text tracking-tighter uppercase whitespace-nowrap">Admin <span className="italic opacity-50">PRO</span></h1>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 italic">Command Center</p>
                </div>

                <nav className="flex flex-col gap-4 flex-1">
                    {[
                        { id: 'projects', icon: <LayoutGrid size={20} />, label: 'Projects' },
                        { id: 'skills', icon: <Layers size={20} />, label: 'Skills' },
                        { id: 'about', icon: <User size={20} />, label: 'Profile' },
                        { id: 'messages', icon: <Mail size={20} />, label: 'Inbox' }
                    ].map((tab) => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-6 px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all
                                ${activeTab === tab.id ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105 active:scale-95' : 'text-white/30 hover:bg-white/5 hover:text-white'}`}
                        >
                            <span className={activeTab === tab.id ? 'scale-125' : ''}>{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <div className="pt-10 border-t border-white/5 flex flex-col gap-6">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-6 px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] text-red-500 hover:bg-red-500/10 active:scale-95 transition-all"
                    >
                        <LogOut size={20} />
                        Logout System
                    </button>
                    <a href="/" className="text-center text-[8px] font-black uppercase tracking-widest text-white/10 hover:text-white transition-colors">&larr; Return to Port</a>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-80 p-16 h-screen overflow-y-auto relative selection:bg-primary shadow-inner shadow-white/5">
                {/* Background glow effects */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[140px] -z-10 animate-pulse"></div>

                <div className="flex justify-between items-center mb-16 px-4">
                   <div className="flex flex-col">
                      <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter gradient-text h-16 md:h-20 drop-shadow-2xl">{activeTab}</h2>
                      <p className="text-[10px] font-black italic uppercase tracking-widest text-white/20 -mt-2">Managing Digital Assets {new Date().toLocaleDateString()}</p>
                   </div>
                   <button onClick={fetchData} className="w-12 h-12 glass border border-white/10 rounded-2xl flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/50 hover:rotate-180 active:scale-90 transition-all duration-700 shadow-xl">
                      <RefreshCcw size={20} />
                   </button>
                </div>

                {loading ? (
                    <div className="h-[60vh] flex flex-col items-center justify-center grayscale opacity-10 animate-pulse">
                        <span className="text-8xl font-black italic uppercase tracking-tighter">Syncing...</span>
                    </div>
                ) : (
                    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {activeTab === 'projects' && (
                            <div className="space-y-16">
                                <div className="glass-card p-12 border-primary/10 relative overflow-hidden group shadow-2xl shadow-primary/5">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] -z-10 group-hover:bg-primary/30 transition-all duration-1000"></div>
                                    <h3 className="text-xl font-black uppercase tracking-widest mb-10 flex items-center gap-4 italic text-primary">
                                        <Plus size={20} /> Deployment Terminal
                                    </h3>
                                    <form onSubmit={handleProjectCreate} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="col-span-full group/field">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-3 group-focus-within/field:text-primary transition-colors">Project Title</label>
                                            <input type="text" className="w-full glass bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-primary text-xl font-bold px-4" required value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} />
                                        </div>
                                        <div className="col-span-full group/field">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-3 group-focus-within/field:text-primary transition-colors">Mission Description</label>
                                            <textarea className="w-full glass bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-primary text-lg font-bold px-4 resize-none" rows="3" required value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} />
                                        </div>
                                        <div className="group/field">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-3 group-focus-within/field:text-primary transition-colors">Live URL</label>
                                            <input type="url" className="w-full glass bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-primary text-lg font-bold px-4" value={newProject.live_url} onChange={e => setNewProject({...newProject, live_url: e.target.value})} />
                                        </div>
                                        <div className="group/field">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-3 group-focus-within/field:text-primary transition-colors">Source Code (GitHub)</label>
                                            <input type="url" className="w-full glass bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-primary text-lg font-bold px-4" value={newProject.github_url} onChange={e => setNewProject({...newProject, github_url: e.target.value})} />
                                        </div>
                                        <div className="col-span-full group/field">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-3 group-focus-within/field:text-primary transition-colors">Technology Stack (Comma Sep)</label>
                                            <input type="text" className="w-full glass bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-primary text-lg font-bold px-4" required placeholder="React, GSAP, Tailwind..." value={newProject.tech_stack} onChange={e => setNewProject({...newProject, tech_stack: e.target.value})} />
                                        </div>
                                        <button type="submit" className="col-span-full py-6 bg-primary text-white font-black uppercase tracking-[0.4em] rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20">Authorize & Deploy</button>
                                    </form>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {projects.map(p => (
                                        <div key={p.id} className="glass-card p-10 border-white/5 bg-white/[0.01] hover:bg-white/[0.04] transition-all flex justify-between items-center group/card relative overflow-hidden">
                                           <div className="absolute top-0 right-0 w-24 h-full bg-white/5 -skew-x-[30deg] translate-x-32 group-hover/card:translate-x-0 transition-transform duration-700"></div>
                                           <div>
                                              <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2 italic">#{p.id.slice(0, 6)}</p>
                                              <h4 className="text-2xl font-black tracking-tighter group-hover/card:text-primary transition-colors uppercase italic">{p.title}</h4>
                                              <p className="text-[10px] font-black text-white/30 uppercase mt-2 tracking-widest">{p.tech_stack}</p>
                                           </div>
                                           <button 
                                              onClick={() => deleteProject(p.id).then(fetchData)}
                                              className="p-5 text-red-500/30 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all active:scale-90 border border-transparent hover:border-red-500/20"
                                           >
                                              <Trash2 size={24} />
                                           </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'skills' && (
                            <div className="space-y-16">
                                <div className="glass-card p-10 border-secondary/10 relative overflow-hidden group shadow-2xl shadow-secondary/5">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 blur-[60px] -z-10 animate-pulse duration-5000"></div>
                                    <h3 className="text-xl font-black tracking-widest uppercase italic mb-10 text-secondary">Inject New Mastery</h3>
                                    <form onSubmit={handleSkillCreate} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
                                        <div className="group/field">
                                           <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-4 group-focus-within/field:text-secondary transition-colors">Skill Identifier</label>
                                           <input type="text" className="w-full glass bg-transparent border-b border-white/10 py-3 px-4 focus:outline-none focus:border-secondary text-lg font-bold" required value={newSkill.name} onChange={e => setNewSkill({...newSkill, name: e.target.value})} />
                                        </div>
                                        <div className="group/field">
                                           <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-4 group-focus-within/field:text-secondary transition-colors">System Category</label>
                                           <select className="w-full glass bg-[#0a0a0a] border border-white/10 p-3 rounded-xl focus:outline-none focus:border-secondary text-lg font-black uppercase italic" value={newSkill.category} onChange={e => setNewSkill({...newSkill, category: e.target.value})}>
                                                {['Frontend', 'Backend', 'Database', 'Tools', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
                                           </select>
                                        </div>
                                        <div className="group/field">
                                           <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-4 group-focus-within/field:text-secondary transition-colors">Efficiency % ({newSkill.percentage})</label>
                                           <input type="range" className="w-full accent-secondary" min="1" max="100" value={newSkill.percentage} onChange={e => setNewSkill({...newSkill, percentage: parseInt(e.target.value)})} />
                                        </div>
                                        <button type="submit" className="md:col-span-full py-6 bg-secondary text-white font-black uppercase tracking-[0.4em] rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-secondary/20">Commit Skill</button>
                                    </form>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {skills.map(s => (
                                        <div key={s.id} className="glass-card p-8 border-white/5 flex flex-col gap-6 hover:border-secondary/30 transition-all group/scard">
                                           <div className="flex justify-between items-center">
                                              <span className="text-[10px] font-black uppercase tracking-widest text-secondary">{s.category}</span>
                                              <button onClick={() => deleteSkill(s.id).then(fetchData)} className="text-white/10 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                           </div>
                                           <h4 className="text-xl font-black italic tracking-tighter uppercase whitespace-nowrap overflow-hidden text-ellipsis">{s.name}</h4>
                                           <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                              <div className="h-full bg-secondary shadow-[0_0_10px_rgba(139,92,246,0.3)] transition-all duration-1000" style={{ width: `${s.percentage}%` }}></div>
                                           </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'about' && (
                            <div className="space-y-16">
                                <form onSubmit={handleAboutUpdate} className="glass-card p-12 lg:p-16 border-white/5 flex flex-col gap-12 group/aboutform">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <div className="group/field">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-6 italic">Brand Identifier / Title</label>
                                            <input type="text" className="w-full glass bg-transparent border-b border-white/10 py-4 px-4 focus:outline-none focus:border-primary text-3xl font-black tracking-tighter" required value={about.title} onChange={e => setAbout({...about, title: e.target.value})} />
                                        </div>
                                        <div className="group/field">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-6 italic">Access Point / Email</label>
                                            <input type="email" className="w-full glass bg-transparent border-b border-white/10 py-4 px-4 focus:outline-none focus:border-primary text-3xl font-black tracking-tighter" required value={about.email} onChange={e => setAbout({...about, email: e.target.value})} />
                                        </div>
                                        <div className="col-span-full group/field">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-6 italic">Core Mission / Biography</label>
                                            <textarea className="w-full glass bg-transparent border border-white/10 p-8 rounded-3xl focus:outline-none focus:border-primary text-xl font-bold leading-relaxed italic resize-none" rows="6" required value={about.description} onChange={e => setAbout({...about, description: e.target.value})} />
                                        </div>
                                    </div>
                                    <button type="submit" className="py-6 bg-white text-dark font-black uppercase tracking-[0.5em] rounded-2xl hover:bg-primary hover:text-white hover:scale-[1.02] shadow-2xl transition-all">Synchronize Override</button>
                                </form>

                                <div className="glass-card p-12 border-white/5 border-dashed bg-transparent hover:bg-white/[0.02] transition-colors relative group/resume">
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                                       <div className="flex items-center gap-8">
                                          <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-white/20 group-hover/resume:text-primary transition-all shadow-xl">
                                             <FileText size={40} />
                                          </div>
                                          <div>
                                             <h4 className="text-2xl font-black italic tracking-tighter uppercase mb-2">Technical Dossier</h4>
                                             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Current File: {about.resume_url ? <span className="text-green-500">READY</span> : <span className="text-red-500">MISSING</span>}</p>
                                          </div>
                                       </div>
                                       <label className="px-10 py-5 bg-white/5 border border-white/10 rounded-full font-black uppercase tracking-widest text-[10px] cursor-pointer hover:bg-white hover:text-dark hover:scale-110 active:scale-95 transition-all shadow-xl">
                                            Upload PDF Binary
                                            <input type="file" className="hidden" accept=".pdf" onChange={handleResumeUpload} />
                                       </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'messages' && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {messages.map((m, idx) => (
                                    <div key={m.id} className="glass-card p-10 border-white/5 flex flex-col gap-8 relative group/msg transition-all hover:bg-white/[0.03]">
                                        <div className="absolute top-8 right-8 text-[8px] font-black text-white/5 group-hover/msg:text-primary transition-colors italic">SIG-0{messages.length - idx}</div>
                                        <div className="flex items-center gap-6">
                                           <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary border border-white/10 italic font-black text-2xl uppercase">{m.name.charAt(0)}</div>
                                           <div>
                                              <p className="text-lg font-black uppercase italic tracking-tighter">{m.name}</p>
                                              <p className="text-[10px] font-black uppercase tracking-widest text-white/20 italic">{m.email}</p>
                                           </div>
                                        </div>
                                        <p className="text-lg font-medium leading-relaxed italic text-white/50 bg-white/[0.01] p-6 rounded-2xl border border-white/5">"{m.message}"</p>
                                        <div className="flex justify-between items-center text-[10px] font-black italic uppercase tracking-widest">
                                           <span className="text-white/10">{new Date(m.created_at).toLocaleString()}</span>
                                           <button onClick={() => deleteMessage(m.id).then(fetchData)} className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                ))}

                                {messages.length === 0 && (
                                    <div className="col-span-full h-[40vh] glass-card p-12 border-dashed border-white/5 flex flex-col items-center justify-center text-center opacity-20 grayscale scale-90">
                                       <Mail size={80} className="mb-8" />
                                       <h4 className="text-4xl font-black italic uppercase italic tracking-tighter">Zero Comms Received</h4>
                                       <p className="text-[10px] font-black uppercase tracking-[0.5em] mt-4">Broadcast Silenced</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
