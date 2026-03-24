import { supabase } from './supabaseClient';

export const getProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
};

export const createProject = async (project) => {
    const { data, error } = await supabase.from('projects').insert([project]).select();
    if (error) throw error;
    return data[0];
};

export const updateProject = async (id, project) => {
    const { data, error } = await supabase.from('projects').update(project).eq('id', id).select();
    if (error) throw error;
    return data[0];
};

export const deleteProject = async (id) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
};

export const getSkills = async () => {
    const { data, error } = await supabase.from('skills').select('*').order('name');
    if (error) throw error;
    return data;
};

export const createSkill = async (skill) => {
    const { data, error } = await supabase.from('skills').insert([skill]).select();
    if (error) throw error;
    return data[0];
};

export const deleteSkill = async (id) => {
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) throw error;
};

// Services System
export const getServices = async () => {
    const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: true });
    if (error) throw error;
    return data;
};

export const createService = async (service) => {
    const { data, error } = await supabase.from('services').insert([service]).select();
    if (error) throw error;
    return data[0];
};

export const updateService = async (id, service) => {
    const { data, error } = await supabase.from('services').update(service).eq('id', id).select();
    if (error) throw error;
    return data[0];
};

export const deleteService = async (id) => {
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) throw error;
};

// NEW: Social Links System
export const getSocialLinks = async () => {
    const { data, error } = await supabase.from('social_links').select('*').single();
    if (error) return { twitter: '#', github: '#', linkedin: '#', email: '#' };
    return data;
};

export const updateSocialLinks = async (links) => {
    const { data, error } = await supabase.from('social_links').upsert({ id: 1, ...links }).select();
    if (error) throw error;
    return data[0];
};

export const getAbout = async () => {
    const { data, error } = await supabase.from('about').select('*').single();
    if (error) throw error;
    return data;
};

export const updateAbout = async (content) => {
    const { data, error } = await supabase.from('about').upsert({ id: 1, ...content }).select(); 
    if (error) throw error;
    return data[0];
};

export const sendMessage = async (msg) => {
    const { error } = await supabase.from('messages').insert([msg]);
    if (error) throw error;
};

export const getMessages = async () => {
    const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
};

export const deleteMessage = async (id) => {
    const { error } = await supabase.from('messages').delete().eq('id', id);
    if (error) throw error;
};

export const uploadResume = async (file) => {
    const fileName = `resume-${Date.now()}.pdf`;
    const { data, error } = await supabase.storage.from('resumes').upload(fileName, file, { cacheControl: '3600', upsert: true });
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from('resumes').getPublicUrl(fileName);
    await supabase.from('about').upsert({ id: 1, resume_url: publicUrl });
    return publicUrl;
};

export const uploadProfileImage = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `profile-${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage.from('profile-images').upload(fileName, file, { cacheControl: '3600', upsert: true });
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from('profile-images').getPublicUrl(fileName);
    await supabase.from('profile').upsert({ id: 1, image_url: publicUrl });
    return publicUrl;
};

export const updateProfileData = async (payload) => {
    const { data, error } = await supabase.from('profile').upsert({ id: 1, ...payload }).select();
    if (error) throw error;
    return data[0];
};

export const getProfileData = async () => {
    const { data, error } = await supabase.from('profile').select('*').order('id', { ascending: false }).limit(1).single();
    if (error) return { image_url: '', role: 'Full-stack Web Developer' };
    return data;
};

export const uploadProjectImage = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `project-${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage.from('project-images').upload(fileName, file, { cacheControl: '3600', upsert: true });
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from('project-images').getPublicUrl(fileName);
    return publicUrl;
};
