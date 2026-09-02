'use client';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

// =========================================
// ANIMATION VARIANTS & DATA
// =========================================
const paragraph1 = [
  "FROM LAGOS TO THE WORLD,",
  "GOLD SALIM OPEYEMI IS A FRONTEND DEVELOPER",
  "KNOWN FOR BUILDING RESPONSIVE, HIGH-PERFORMANCE",
  "WEB APPLICATIONS WITH CLEAN, MODERN CODE.",
  "A FRONTEND DEVELOPER FOCUSED ON CREATING SEAMLESS,"
];

const paragraph2 = [
  "USER-FRIENDLY DIGITAL EXPERIENCES.",
  "HIS WORK BLENDS MINIMAL AESTHETICS WITH",
  "STRONG FUNCTIONALITY AND STRUCTURED LAYOUTS.",
  "HE SPECIALIZES IN REACT, NEXT.JS, AND UI/UX",
  "ALWAYS EXPLORING NEW WAYS TO COMBINE CREATIVITY WITH TECHNOLOGY."
];

const containerVariants = {
  hidden: { opacity: 1 }, 
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const lineVariants = {
  hidden: { opacity: 0.15, y: 20 }, 
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" } 
  },
};

// REMOVED pageVariants - causing errors

// Add interface for nav items
interface NavItem {
  name: string;
  path: string;
}

// Add interface for slot positions
interface SlotPosition {
  y: string;
  scale: number;
  rotate: number;
  zIndex: number;
}

export default function AboutPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const router = useRouter();

  // Scroll animation setup
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["30%", "0%", "30%"]
  );

  // =========================================
  // CAROUSEL LOOP EFFECT (Every 2.5 seconds)
  // =========================================
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 3);
    }, 2500); 
    return () => clearInterval(interval);
  }, []);

  // Tighter vertical positions so it doesn't move beyond the text height
  const slots: SlotPosition[] = [
    { y: "-35%", scale: 0.75, rotate: 8, zIndex: 10 },  // Slot 0: Top / Back
    { y: "0%", scale: 0.85, rotate: -4, zIndex: 20 },   // Slot 1: Middle
    { y: "35%", scale: 0.95, rotate: 6, zIndex: 30 },   // Slot 2: Bottom / Front
  ];

  // Cinematic easing for the slide-and-snap motion
  const carouselTransition = { 
    duration: 1, 
    ease: [0.77, 0, 0.175, 1] as const
  };

  // Navigation items configuration
  const navItems: NavItem[] = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'WORK', path: '/work' },
    { name: "LET'S TALK", path: '/contact' },
  ];

  // Handle navigation with smooth transition
  const handleNavigation = (path: string): void => {
    if (path) {
      setIsNavigating(true);
      setIsOpen(false);
      setTimeout(() => {
        router.push(path);
      }, 300);
    } else {
      setIsOpen(false);
    }
  };

  return (
    // REMOVED AnimatePresence and motion.main - using regular div instead
    <div className="w-full bg-[#EBEAE5] text-[#121ABC] overflow-x-hidden font-sans">
      
      {/* =========================================
          NAVIGATION MENU & OVERLAYS
      ========================================= */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-8 right-8 z-30 flex flex-col gap-[10px] p-2 cursor-pointer hover:opacity-80 transition-opacity"
        aria-label="Open menu"
      >
        <div className="w-9 h-[3px] bg-[#1821c9] rounded-sm"></div>
        <div className="w-9 h-[3px] bg-[#1821c9] rounded-sm"></div>
      </button>

      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[480px] bg-[#1821c9] text-white z-50 px-10 pb-12 pt-10 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-2xl flex flex-col justify-between overflow-hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="relative w-full flex flex-col h-full">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-0 right-0 w-12 h-12 flex items-start justify-end cursor-pointer group"
            aria-label="Close menu"
          >
            <div className="w-10 h-[2px] bg-white transition-transform duration-300 group-hover:rotate-45"></div>
          </button>

          <nav className="flex flex-col mt-28 gap-0 flex-grow">
            {navItems.map((item, idx) => {
              if (item.path) {
                return (
                  <div 
                    key={item.name}
                    onClick={() => handleNavigation(item.path)}
                    className="group flex justify-between items-center border-b border-white/20 py-5 cursor-pointer hover:border-white/80 transition-colors first:border-t w-full"
                  >
                    <h2 className="text-[56px] font-black uppercase leading-[0.85] tracking-tight font-condensed">
                      {item.name}
                    </h2>
                    <span className="text-[18px] font-bold opacity-60 group-hover:opacity-100 transition-opacity tracking-wider">
                      0{idx + 1}
                    </span>
                  </div>
                );
              } else {
                return (
                  <div 
                    key={item.name}
                    onClick={() => setIsOpen(false)}
                    className="group flex justify-between items-center border-b border-white/20 py-5 cursor-pointer hover:border-white/80 transition-colors first:border-t w-full"
                  >
                    <h2 className="text-[56px] font-black uppercase leading-[0.85] tracking-tight font-condensed">
                      {item.name}
                    </h2>
                    <span className="text-[18px] font-bold opacity-60 group-hover:opacity-100 transition-opacity tracking-wider">
                      0{idx + 1}
                    </span>
                  </div>
                );
              }
            })}
          </nav>

          <div className="flex gap-3 mt-4">
            {[
              { name: 'X', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
              { name: 'IG', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
              { name: 'IN', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h5v-8.366c0-4.62 6.135-4.958 6.135 0v8.366h5v-10.199c0-7.713-8.614-7.456-11.167-3.538v-2.263z"/></svg> }
            ].map((social) => (
              <div key={social.name} className="w-12 h-12 bg-white text-[#1821c9] flex items-center justify-center rounded-[14px] cursor-pointer hover:scale-105 transition-transform">
                {social.icon}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex justify-center items-center pt-8">
          <span className="text-[16px] opacity-60 font-medium tracking-wide">© 2026 GOLD SALIM OPEYEMI</span>
        </div>
      </div>

      <header className="absolute top-8 left-8 z-50">
        <Link href="/" className="font-bold text-xl tracking-[0.2em] flex items-start gap-1 cursor-pointer">
          G - S <span className="text-xs mt-[2px]">©</span>
        </Link>
      </header>

      {/* =========================================
          HERO SECTION (SPACING & CAROUSEL)
      ========================================= */}
      <section 
        ref={containerRef} 
        className="relative min-h-[110vh] w-full flex flex-col justify-center items-center bg-[#F0EEE6] overflow-hidden"
      >
        <div className="relative w-full flex justify-between items-center px-[2vw] z-10 pointer-events-none">
          
          <h1 
            className="text-[20vw] leading-none m-0 p-0 uppercase tracking-[-0.03em] text-[#1C24B6] select-none"
            style={{ 
              fontFamily: 'Impact, sans-serif',
              transform: 'scaleY(1.15)',
              transformOrigin: 'center left' 
            }}
          >
            GOLD
          </h1>

          <div className="relative">
            <h1 
              className="text-[20vw] leading-none m-0 p-0 uppercase tracking-[-0.03em] text-[#1C24B6] select-none"
              style={{ 
                fontFamily: 'Impact, sans-serif',
                transform: 'scaleY(1.15)',
                transformOrigin: 'center right' 
              }}
            >
              SALIM
            </h1>
            
            <div className="absolute top-[85%] right-[-5%] w-[70%] z-40 opacity-90">
              <svg viewBox="0 0 350 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-[#1C24B6]">
                <path d="M 80 30 C 10 0, -30 80, 40 120 C 110 160, 170 60, 120 40 C 70 20, 30 70, 60 110 C 90 150, 130 90, 150 80 C 170 70, 180 70, 180 85 C 180 100, 160 110, 170 110 C 190 110, 280 80, 320 70" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 335 78 L 342 85" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* =========================================
            VERTICAL 3D CAROUSEL (LOOPING SLOTS)
        ========================================= */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 aspect-[3/4] w-[15vw] min-w-[170px] pointer-events-none">
          
          <motion.div 
            animate={slots[(0 + step) % 3]}
            transition={carouselTransition}
            className="absolute inset-0 w-full h-full rounded-xl overflow-hidden shadow-2xl bg-gray-300 border-[4px] border-[#F0EEE6]"
          >
            <Image src="/handlap.avif" alt="Portrait" fill className="object-cover grayscale" priority />
          </motion.div>

          <motion.div 
            animate={slots[(1 + step) % 3]}
            transition={carouselTransition}
            className="absolute inset-0 w-full h-full rounded-xl overflow-hidden shadow-2xl bg-gray-400 border-[4px] border-[#F0EEE6]"
          >
            <Image src="/handwrite.avif" alt="Working" fill className="object-cover grayscale" priority />
          </motion.div>

          <motion.div 
            animate={slots[(2 + step) % 3]}
            transition={carouselTransition}
            className="absolute inset-0 w-full h-full rounded-xl overflow-hidden shadow-2xl bg-gray-500 border-[4px] border-[#F0EEE6]"
          >
            <Image src="/handjaw.avif" alt="Close Up" fill className="object-cover grayscale" priority />
          </motion.div>

        </div>
      </section>

      {/* =========================================
          BLUE TEXT SECTION - PROFESSIONAL SUMMARY
      ========================================= */}
      <section className="relative w-full bg-[#121ABC] text-[#EBEAE5] py-32 px-[6vw] flex flex-col gap-16 md:gap-24 items-center justify-center text-center overflow-hidden">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="w-full max-w-[90vw]"
        >
          {paragraph1.map((line, i) => (
            <motion.p 
              key={i}
              variants={lineVariants}
              className="text-[6vw] md:text-[5vw] lg:text-[4.5vw] leading-[1.05] font-black uppercase tracking-tighter"
              style={{ fontFamily: 'Impact, sans-serif' }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="w-full max-w-[90vw]"
        >
          {paragraph2.map((line, i) => (
            <motion.p 
              key={i}
              variants={lineVariants}
              className="text-[6vw] md:text-[5vw] lg:text-[4.5vw] leading-[1.05] font-black uppercase tracking-tighter"
              style={{ fontFamily: 'Impact, sans-serif' }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>
      </section>

      {/* =========================================
          SKILLS AND EXPERTISE SECTION
      ========================================= */}
      <section className="relative w-full bg-[#EBEAE5] text-[#121ABC] py-24 px-[6vw]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          
          <div className="flex flex-col">
            <h2 
              className="text-[22px] md:text-[28px] font-black uppercase tracking-tight mb-6" 
              style={{ fontFamily: 'Impact, sans-serif' }}
            >
              TECHNICAL SKILLS
            </h2>
            <p className="text-[16px] md:text-[18px] font-bold uppercase leading-[1.4] max-w-[90%]">
              BUILDING RESPONSIVE, HIGH-PERFORMANCE WEB APPLICATIONS USING MODERN TECHNOLOGIES. FOCUSED ON CLEAN CODE, REUSABLE COMPONENTS, AND OPTIMIZED USER EXPERIENCES.
            </p>
          </div>

          <div className="flex flex-col w-full mt-2 md:mt-0">
            {[
              'REACT.JS & NEXT.JS', 
              'TYPESCRIPT & JAVASCRIPT', 
              'TAILWIND CSS', 
              'REST API INTEGRATION'
            ].map((skill, i) => (
              <div 
                key={i} 
                className="py-5 border-b-[1.5px] border-dashed border-[#121ABC]/60 w-full first:pt-0"
              >
                <h3 className="text-[24px] md:text-[28px] font-bold uppercase tracking-tight leading-none m-0">
                  {skill}
                </h3>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* =========================================
          CLIENTS SECTION
      ========================================= */}
      <section className="relative w-full bg-[#EBEAE5] py-24 px-[6vw] flex flex-col md:flex-row justify-between items-center gap-12 md:gap-8">
        
        <div className="w-full md:w-[40%]">
          <h2 
            className="text-[#121ABC] text-[24px] md:text-[28px] font-black uppercase tracking-tight mb-4"
            style={{ fontFamily: 'Impact, sans-serif' }}
          >
            COMPANIES I'VE WORKED WITH
          </h2>
          <p className="text-[#121ABC] text-[14px] md:text-[15px] font-bold uppercase leading-snug">
            BUILDING DIGITAL SOLUTIONS FOR<br />
            COMPANIES ACROSS VARIOUS INDUSTRIES,<br />
            DELIVERING MODERN, SCALABLE, AND<br />
            USER-FOCUSED WEB APPLICATIONS.
          </p>
        </div>

        <div className="w-full md:w-[55%] grid grid-cols-2 gap-2">
          
          <div className="bg-[#F5F4F0] rounded-xl flex items-center justify-center h-[140px] md:h-[200px]">
            <span className="text-black font-semibold text-2xl tracking-tighter flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              All Tech
            </span>
          </div>
          <div className="bg-[#F5F4F0] rounded-xl flex items-center justify-center h-[140px] md:h-[200px]">
            <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" className="w-12 h-12"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-4a6 6 0 100-12 6 6 0 000 12zm0-4a2 2 0 100-4 2 2 0 000 4z"/></svg>
          </div>

          <div className="bg-[#F5F4F0] rounded-xl flex items-center justify-center h-[140px] md:h-[200px]">
            <span className="text-black font-bold text-xl flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M12 2v20m10-10H2m17.07-7.07l-14.14 14.14M19.07 19.07L4.93 4.93"/></svg>
              Nuvin Lab
            </span>
          </div>
          <div className="bg-[#F5F4F0] rounded-xl flex items-center justify-center h-[140px] md:h-[200px]">
            <span className="text-black font-bold text-xl flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              VELTO
            </span>
          </div>

          <div className="bg-[#F5F4F0] rounded-xl flex items-center justify-center h-[140px] md:h-[200px]">
            <div className="flex -space-x-4">
              <div className="w-10 h-10 rounded-full border-2 border-black"></div>
              <div className="w-10 h-10 rounded-full border-2 border-black bg-gray-200"></div>
              <div className="w-10 h-10 rounded-full border-2 border-black bg-gray-400"></div>
            </div>
          </div>
          <div className="bg-[#F5F4F0] rounded-xl flex items-center justify-center h-[140px] md:h-[200px]">
            <span className="text-black font-black text-4xl tracking-tighter">GS</span>
          </div>

        </div>
      </section>

      {/* =========================================
          WORK EXPERIENCE SECTION
      ========================================= */}
      <section className="relative w-full bg-[#EBEAE5] text-[#121ABC] py-24 px-[6vw]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          
          <div className="flex flex-col">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 opacity-90">
              WORK EXPERIENCE
            </h2>
            <p className="text-[18px] md:text-[20px] font-bold uppercase leading-[1.4] max-w-md">
              Working with studios, startups, and global clients to create modern digital experiences focused on clarity, structure, and strong visual systems. Over the years, I have collaborated on branding, UI/UX, and interactive projects across multiple industries.
            </p>
          </div>

          <div className="flex flex-col">
            {[
              { role: 'ALL TECH SYSTEMS & CO, FRONTEND DEV', date: '2023 — 2025' },
              { role: 'FREELANCE, FRONTEND DEVELOPER', date: '2024 — PRESENT' },
              { role: 'UNIVERSITY COMMUNITY SERVICE GROUP', date: '2022 — 2023' },
            ].map((job, idx) => (
              <div 
                key={idx} 
                className="flex justify-between items-center py-6 border-b border-dashed border-[#121ABC]/30"
              >
                <span className="text-[16px] font-bold uppercase tracking-wide">
                  {job.role}
                </span>
                <span className="text-[16px] font-bold uppercase tracking-wide whitespace-nowrap ml-4">
                  {job.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          EDUCATION SECTION
      ========================================= */}
      <section className="relative w-full bg-[#EBEAE5] text-[#121ABC] py-24 px-[6vw] border-t border-[#121ABC]/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          
          <div className="flex flex-col">
            <h2 
              className="text-[22px] md:text-[28px] font-black uppercase tracking-tight mb-6" 
              style={{ fontFamily: 'Impact, sans-serif' }}
            >
              EDUCATION
            </h2>
          </div>

          <div className="flex flex-col w-full">
            {[
              { school: 'KWARA STATE UNIVERSITY', degree: 'B.A. ENGLISH', date: '2019 — 2024' },
              { school: 'FEDERAL GOVERNMENT COLLEGE, ILORIN', degree: 'SENIOR SECONDARY CERTIFICATE', date: '2013 — 2019' },
              { school: 'NERDC STAFF SCHOOL', degree: 'FIRST SCHOOL LEAVING CERTIFICATE', date: '2007 — 2013' },
            ].map((edu, idx) => (
              <div 
                key={idx} 
                className="py-6 border-b border-dashed border-[#121ABC]/30"
              >
                <h3 className="text-[18px] md:text-[20px] font-black uppercase tracking-tight leading-tight">
                  {edu.school}
                </h3>
                <p className="text-[14px] md:text-[15px] font-bold uppercase tracking-wide opacity-80 mt-1">
                  {edu.degree}
                </p>
                <span className="text-[13px] font-bold uppercase tracking-wide opacity-60">
                  {edu.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}