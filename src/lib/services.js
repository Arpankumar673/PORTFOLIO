import { supabase } from './supabaseClient'

// --- PROJECTS ---
export const getProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return data
}

export const createProject = async (project) => {
    const { data, error } = await supabase.from('projects').insert([project]).select()
    if (error) throw error
    return data[0]
}

export const deleteProject = async (id) => {
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) throw error
}

// --- SKILLS ---
export const getSkills = async () => {
    const { data, error } = await supabase.from('skills').select('*').order('percentage', { ascending: false })
    if (error) throw error
    return data
}

export const createSkill = async (skill) => {
    const { data, error } = await supabase.from('skills').insert([skill]).select()
    if (error) throw error
    return data[0]
}

export const deleteSkill = async (id) => {
    const { error } = await supabase.from('skills').delete().eq('id', id)
    if (error) throw error
}

// --- ABOUT ---
export const getAbout = async () => {
    const { data, error } = await supabase.from('about').select('*').single()
    if (error && error.code !== 'PGRST116') throw error
    return data || { title: '', description: '', email: '' }
}

export const updateAbout = async (aboutData) => {
    const { data, error } = await supabase.from('about').upsert(aboutData).select()
    if (error) throw error
    return data[0]
}

// --- MESSAGES ---
export const getMessages = async () => {
    const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return data
}

export const sendMessage = async (message) => {
    const { data, error } = await supabase.from('messages').insert([message]).select()
    if (error) throw error
    return data[0]
}

export const deleteMessage = async (id) => {
    const { error } = await supabase.from('messages').delete().eq('id', id)
    if (error) throw error
}

// --- STORAGE ---
export const uploadResume = async (file) => {
    const fileName = `resume-${Date.now()}.pdf`
    const { error: uploadError } = await supabase.storage.from('resumes').upload(fileName, file)
    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage.from('resumes').getPublicUrl(fileName)
    await updateAbout({ id: 1, resume_url: publicUrl })
    return publicUrl
}
