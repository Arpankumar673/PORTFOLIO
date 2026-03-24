import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { getProjects, getSkills, getAbout } from '../lib/services';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import Hero from '../sections/Hero';
import Projects from '../sections/Projects';
import Skills from '../sections/Skills';
import Contact from '../sections/Contact';

const Home = () => {
  const [data, setData] = useState({ projects: [], skills: [], about: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Smooth Scroll Initialization
    const lenis = new Lenis({
        duration: 2.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const fetchData = async () => {
      try {
        const [proj, skl, abt] = await Promise.all([
          getProjects(),
          getSkills(),
          getAbout()
        ]);
        setData({ projects: proj, skills: skl, about: abt });
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
    <main className="bg-dark text-white selection:bg-primary selection:text-white">
      <Navbar />
      <Hero data={data.about} />
      <div className="pt-20">
         <Projects projects={data.projects} />
         <Skills skills={data.skills} />
         <Contact />
      </div>
      <Footer />
    </main>
  );
};

export default Home;
