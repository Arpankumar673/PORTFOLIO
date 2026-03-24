import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import Services from '../sections/Services';
import Contact from '../sections/Contact';
import Experience from '../sections/Experience';
import Certificates from '../sections/Certificates';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Skills from '../sections/Skills';
import { getProjects, getSkills, getServices, getAbout, getProfileData, getSocialLinks, getExperience, getCertificates } from '../lib/services';

const Home = () => {
  const [data, setData] = useState({ 
    projects: [], 
    skills: [], 
    services: [], 
    about: null, 
    profile: { image_url: '', role: '' },
    socials: { twitter: '#', github: '#', linkedin: '#', email: '#' },
    experience: [],
    certificates: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Smooth Scroll Initialization
    const lenis = new Lenis({
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const fetchData = async () => {
      try {
        const [proj, skl, serv, abt, prof, soc, exp, cert] = await Promise.all([
          getProjects(),
          getSkills(),
          getServices(),
          getAbout(),
          getProfileData(),
          getSocialLinks(),
          getExperience(),
          getCertificates()
        ]);
        
        setData({ 
            projects: proj, 
            skills: skl, 
            services: serv, 
            about: abt, 
            profile: prof,
            socials: soc,
            experience: exp,
            certificates: cert
        });
      } catch (err) {
        console.error("Fetch Error: ", err);
      } finally {
        setTimeout(() => setLoading(false), 1500);
      }
    };
    fetchData();

    return () => lenis.destroy();
  }, []);

  if (loading) return <Loading />;

  return (
    <main className="bg-background text-white">
      <Navbar />
      <Hero 
        data={data.about} 
        profileImage={data.profile.image_url} 
        role={data.profile.role} 
        socials={data.socials}
      />
      <About 
        data={data.about} 
        profileImage={data.profile.image_url} 
        role={data.profile.role} 
      />
      <div className="bg-[#080808]">
         <Services services={data.services} />
         <Skills skills={data.skills} />
         <Experience experience={data.experience} />
         <Certificates certificates={data.certificates} />
         <Projects projects={data.projects} />
         <Contact />
      </div>
      <Footer socials={data.socials} />
    </main>
  );
};

export default Home;
