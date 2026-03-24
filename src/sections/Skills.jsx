import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as Icons from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Layout = Icons.Layout || Icons.LayoutIcon || (() => null);
const Database = Icons.Database || Icons.DatabaseIcon || (() => null);
const ShieldCheck = Icons.ShieldCheck || Icons.ShieldCheckIcon || (() => null);
const Layers = Icons.Layers || Icons.LayersIcon || (() => null);
const Tool = Icons.Tool || Icons.ToolIcon || Icons.Wrench || (() => null);

const SkillCard = ({ skill, index }) => {
  const barRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(barRef.current, 
      { width: 0 }, 
      { 
        width: `${skill.percentage}%`, 
        duration: 2.5, 
        ease: 'power4.out',
        scrollTrigger: {
          trigger: barRef.current,
          start: 'top 95%',
        }
      }
    );
  }, [skill.percentage]);

  return (
    <div className="mb-8 last:mb-0 group/skill">
      <div className="flex justify-between items-center mb-3">
         <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60 group-hover/skill:text-primary transition-colors">{skill.name}</span>
         <span className="text-[10px] font-black italic text-primary group-hover/skill:scale-125 transition-transform">{skill.percentage}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
         <div 
           ref={barRef}
           className="h-full bg-gradient-to-r from-primary via-secondary to-accent shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover/skill:brightness-125 transition-all"
         ></div>
      </div>
    </div>
  );
};

const Skills = ({ skills = [] }) => {
  const categories = ['Frontend', 'Backend', 'Database', 'Tools', 'Other'];
  
  const categorized = categories.reduce((acc, cat) => {
    acc[cat] = skills.filter(s => s.category === cat);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-32 relative overflow-hidden bg-dark">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[140px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col mb-24 items-center text-center">
            <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase">Expertise <span className="gradient-text italic">& Mastery</span></h2>
            <div className="w-16 h-1 bg-primary/40 mx-auto rounded-full mb-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {categories.map((cat, i) => (
             categorized[cat]?.length > 0 || i < 3 ? (
              <div key={cat} className="glass-card p-10 border-white/5 bg-white/[0.01] hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group">
                <div className="flex items-center gap-5 mb-10">
                   <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-12 transition-all border border-white/10 group-hover:border-primary/50 shadow-xl">
                      {cat === 'Frontend' && <Layout size={24} />}
                      {cat === 'Backend' && <Database size={24} />}
                      {cat === 'Database' && <ShieldCheck size={24} />}
                      {cat === 'Tools' && <Layers size={24} />}
                      {cat === 'Other' && <Tool size={24} />}
                   </div>
                   <h3 className="text-2xl font-black tracking-tighter uppercase italic">{cat}</h3>
                </div>
                
                <div className="space-y-4">
                   {categorized[cat]?.length > 0 ? (
                     categorized[cat].map(s => <SkillCard key={s.id} skill={s} />)
                   ) : (
                     [1, 2, 3].map(j => <SkillCard key={j} skill={{ name: `${cat} Module ${j}`, percentage: 60 + (j*10) }} />)
                   )}
                </div>
              </div>
             ) : null
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
