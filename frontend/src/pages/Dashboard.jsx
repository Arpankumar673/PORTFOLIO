import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
    getProjects, deleteProject, createProject, updateProject, 
    getSkills, deleteSkill, createSkill, 
    getAbout, updateAbout, getMessages, deleteMessage,
    uploadResume
} from '../lib/services';
import * as Icons from 'lucide-react';

const LayoutGrid = Icons.LayoutGrid || Icons.GridIcon;
const Layers = Icons.Layers || Icons.LayersIcon;
const User = Icons.User || Icons.UserIcon;
const Mail = Icons.Mail || Icons.MailIcon;
const LogOut = Icons.LogOut || Icons.LogOutIcon;
const Plus = Icons.Plus || Icons.PlusIcon;
const Trash2 = Icons.Trash2 || Icons.TrashIcon;
const Edit = Icons.Edit || Icons.EditIcon;
const Save = Icons.Save || Icons.SaveIcon;
const RefreshCcw = Icons.RefreshCcw || Icons.RefreshIcon;
const FileText = Icons.FileText || Icons.FileIcon;


const Dashboard = () => {
    const { logoutUser } = useAuth();
    const [activeTab, setActiveTab] = useState('projects');
    const [data, setData] = useState({ 
        projects: [], 
        skills: [], 
        about: {}, 
        messages: []
    });
    const [loading, setLoading] = useState(true);

    const tabs = [
        { id: 'projects', label: 'Projects', icon: LayoutGrid },
        { id: 'skills', label: 'Skills', icon: Layers },
        { id: 'about', label: 'About', icon: User },
        { id: 'messages', label: 'Messages', icon: Mail },
        { id: 'resume', label: 'Resume', icon: FileText },
    ];

    const fetchData = async () => {
        setLoading(true);
        try {
            const [p, s, a, m] = await Promise.all([
                getProjects(), getSkills(), getAbout(), getMessages()
            ]);
            setData({
                projects: p,
                skills: s,
                about: a,
                messages: m
            });
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (type, id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            if (type === 'project') await deleteProject(id);
            if (type === 'skill') await deleteSkill(id);
            if (type === 'message') await deleteMessage(id);
            fetchData();
        } catch (err) { alert('Failed to delete'); }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-black uppercase tracking-tighter">Admin Dashboard</h1>
                    <button onClick={logoutUser} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500 hover:text-white transition-all text-sm font-bold">
                        <LogOut size={16} /> Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Sidebar Tabs */}
                    <div className="lg:col-span-3 space-y-2">
                        {tabs.map(tab => (
                            <button 
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl font-bold transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 hover:bg-white/10 text-white/50'}`}
                            >
                                <tab.icon size={20} />
                                {tab.label}
                                {tab.id === 'messages' && data.messages.length > 0 && <span className="ml-auto bg-primary text-[10px] px-2 py-0.5 rounded-full">{data.messages.length}</span>}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-9 glass-card p-8 border border-white/5">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 text-white/30 gap-4">
                                <RefreshCcw size={40} className="animate-spin" />
                                <p className="font-medium animate-pulse">Syncing with Supabase...</p>
                            </div>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
                                {activeTab === 'projects' && <ProjectsManager projects={data.projects} onUpdate={fetchData} />}
                                {activeTab === 'skills' && <SkillsManager skills={data.skills} onUpdate={fetchData} />}
                                {activeTab === 'about' && <AboutManager about={data.about} onUpdate={fetchData} />}
                                {activeTab === 'messages' && <MessagesManager messages={data.messages} onDelete={handleDelete} />}
                                {activeTab === 'resume' && <ResumeManager resume={data.about} onUpdate={fetchData} />}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Sub-components
const ProjectsManager = ({ projects, onUpdate }) => {
    const [newItem, setNewItem] = useState({ title: '', description: '', tech_stack: '', github_link: '', live_link: '', image_url: '' });
    
    const handleAdd = async () => {
        const stackArray = newItem.tech_stack.split(',').map(s => s.trim());
        await createProject({ ...newItem, tech_stack: stackArray });
        setNewItem({ title: '', description: '', tech_stack: '', github_link: '', live_link: '', image_url: '' });
        onUpdate();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold uppercase tracking-widest text-white/50">Manage Projects</h3>
            </div>
            
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-10 space-y-4">
                 <h4 className="text-sm font-bold uppercase text-primary mb-4 flex items-center gap-2"><Plus size={16}/> Add New</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input className="bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-sm" placeholder="Title" value={newItem.title} onChange={e => setNewItem({...newItem, title: e.target.value})} />
                    <input className="bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-sm" placeholder="Tech Stack (comma separated)" value={newItem.tech_stack} onChange={e => setNewItem({...newItem, tech_stack: e.target.value})} />
                    <input className="bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-sm" placeholder="GitHub Link" value={newItem.github_link} onChange={e => setNewItem({...newItem, github_link: e.target.value})} />
                    <input className="bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-sm" placeholder="Live Link" value={newItem.live_link} onChange={e => setNewItem({...newItem, live_link: e.target.value})} />
                    <input className="bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-sm md:col-span-2" placeholder="Image URL" value={newItem.image_url} onChange={e => setNewItem({...newItem, image_url: e.target.value})} />
                    <textarea className="bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-sm md:col-span-2" placeholder="Description" value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})} />
                 </div>
                 <button onClick={handleAdd} className="px-6 py-2 bg-primary text-white font-bold rounded-lg text-sm">Add Project</button>
            </div>

            <div className="space-y-4">
                {projects.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 group">
                        <div className="flex gap-4 items-center">
                            <img src={p.image_url} className="w-12 h-12 object-cover rounded-lg bg-dark" alt=""/>
                            <div>
                                <h4 className="font-bold">{p.title}</h4>
                                <p className="text-xs text-white/30 truncate max-w-xs">{p.description}</p>
                            </div>
                        </div>
                        <button onClick={() => deleteProject(p.id).then(onUpdate)} className="p-2 text-white/20 hover:text-red-500 rounded-lg transition-all opacity-0 group-hover:opacity-100"><Trash2 size={18} /></button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SkillsManager = ({ skills, onUpdate }) => {
    const [newItem, setNewItem] = useState({ name: '', percentage: 80, category: 'Frontend' });
    const handleAdd = async () => {
        await createSkill(newItem);
        setNewItem({ name: '', percentage: 80, category: 'Frontend' });
        onUpdate();
    };
    return (
        <div>
            <h3 className="text-xl font-bold uppercase tracking-widest text-white/50 mb-8">Manage Skills</h3>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-10 flex flex-wrap gap-4 items-end">
                <input className="bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-sm" placeholder="Skill Name" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} />
                <select className="bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-sm" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})}>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="Tools">Tools</option>
                    <option value="Other">Other</option>
                </select>
                <input type="number" className="bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-sm w-20" placeholder="%" value={newItem.percentage} onChange={e => setNewItem({...newItem, percentage: e.target.value})} />
                <button onClick={handleAdd} className="px-6 py-2 bg-primary text-white font-bold rounded-lg text-sm">Add Skill</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map(s => (
                    <div key={s.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                        <div>
                            <span className="text-[10px] uppercase font-bold text-white/30 tracking-widest block">{s.category}</span>
                            <h4 className="font-bold">{s.name} - {s.percentage}%</h4>
                        </div>
                        <button onClick={() => deleteSkill(s.id).then(onUpdate)} className="p-2 text-white/10 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AboutManager = ({ about, onUpdate }) => {
    const [formData, setFormData] = useState(about || { title: '', description: '', email: '' });
    const handleSave = async () => {
        await updateAbout(formData);
        alert('Saved to Supabase!');
        onUpdate();
    };
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold uppercase tracking-widest text-white/50 mb-4">Edit About Content</h3>
            <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" placeholder="Hero Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 h-40" placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" placeholder="Contact Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            <button onClick={handleSave} className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 transition-all"><Save size={18} /> Save Changes</button>
        </div>
    );
};

const MessagesManager = ({ messages, onDelete }) => (
    <div className="space-y-4">
        <h3 className="text-xl font-bold uppercase tracking-widest text-white/50 mb-8">Recent Contacts</h3>
        {messages.map(m => (
            <div key={m.id} className="p-6 bg-white/5 rounded-2xl border border-white/10 relative group">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h4 className="font-bold text-lg">{m.name}</h4>
                        <p className="text-xs text-primary font-bold">{m.email}</p>
                    </div>
                    <span className="text-[10px] text-white/20 font-mono">{new Date(m.created_at).toLocaleString()}</span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{m.message}</p>
                <button onClick={() => onDelete('message', m.id)} className="absolute top-4 right-4 p-2 text-white/5 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"><Trash2 size={18} /></button>
            </div>
        ))}
    </div>
);

const ResumeManager = ({ resume, onUpdate }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        try {
            await uploadResume(file);
            alert('Resume updated in Supabase Storage!');
            onUpdate();
        } catch (err) { alert('Upload failed. Must be a PDF.'); }
        setUploading(false);
    };

    return (
        <div className="p-4 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center py-20 bg-white/5">
            <FileText size={60} className="text-white/20 mb-6" />
            <p className="text-white/60 mb-10 text-center max-w-sm">Current Resume: <a href={resume?.resume_url} target="_blank" className="text-primary font-bold text-sm underline">{resume?.resume_url ? 'View Current PDF' : 'None'}</a></p>
            <input type="file" accept=".pdf" className="hidden" id="resume-upload" onChange={e => setFile(e.target.files[0])} />
            <label htmlFor="resume-upload" className="mb-6 px-10 py-4 bg-white/10 rounded-2xl cursor-pointer hover:bg-white/20 transition-all font-bold">
                {file ? file.name : 'Select PDF File'}
            </label>
            <button 
                onClick={handleUpload} 
                disabled={!file || uploading} 
                className="px-10 py-4 bg-primary text-white font-black rounded-2xl hover:scale-105 transition-all disabled:opacity-50"
            >
                {uploading ? 'Uploading to Storage...' : 'Upload & Update'}
            </button>
        </div>
    );
};

export default Dashboard;
