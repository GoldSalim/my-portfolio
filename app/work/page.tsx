'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function WorkPage() {
  const [isOpen, setIsOpen] = useState(false);

  // Portfolio data - Updated with your actual projects
  const projects = [
    { 
      title: 'RESUME BUILDER APP', 
      year: '© 24', 
      src: '/resume1.png',
      description: 'Interactive resume building application'
    },
    { 
      title: 'E-COMMERCE PLATFORM', 
      year: '© 25', 
      src: '/ecomerce.png',
      description: 'Full-featured online store'
    },
    { 
      title: 'TASK MANAGEMENT DASHBOARD', 
      year: '© 25', 
      src: '/taskmanager.jpg',
      description: 'Productivity and task tracking tool'
    },
    { 
      title: 'BUSINESS WEBSITE', 
      year: '© 24', 
      src: '/bussiness.jpg',
      description: 'Responsive corporate website'
    },
    { 
      title: 'MODERN DASHBOARD', 
      year: '© 24', 
      src: '/dasboard.jpg',
      description: 'Analytics and data visualization'
    },
  ];

  // Navigation items with proper paths
  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'WORK', path: '/work' },
    { name: "LET'S TALK", path: '/contact' },
  ];

  return (
    <main className="relative w-full bg-[#EBEAE5] text-[#121ABC] font-sans">
      
      {/* =========================================
          NAVIGATION MENU & OVERLAYS
      ========================================= */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-8 right-8 z-40 flex flex-col gap-[10px] p-2 cursor-pointer hover:opacity-80 transition-opacity"
        aria-label="Open menu"
        type="button"
      >
        <div className="w-9 h-[3px] bg-[#121ABC] rounded-sm"></div>
        <div className="w-9 h-[3px] bg-[#121ABC] rounded-sm"></div>
      </button>

      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[480px] bg-[#121ABC] text-white z-[60] px-10 pb-12 pt-10 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-2xl flex flex-col justify-between overflow-hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="relative w-full flex flex-col h-full">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-0 right-0 w-12 h-12 flex items-start justify-end cursor-pointer group"
            aria-label="Close menu"
            type="button"
          >
            <div className="w-10 h-[2px] bg-white transition-transform duration-300 group-hover:rotate-45"></div>
          </button>

          <nav className="flex flex-col mt-28 gap-0 flex-grow">
            {navItems.map((item, idx) => (
              <Link 
                key={item.name}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className="group flex justify-between items-center border-b border-white/20 py-5 cursor-pointer hover:border-white/80 transition-colors first:border-t text-white decoration-transparent w-full"
              >
                <h2 className="text-[56px] font-black uppercase leading-[0.85] tracking-tight">
                  {item.name}
                </h2>
                <span className="text-[18px] font-bold opacity-60 group-hover:opacity-100 transition-opacity tracking-wider">
                  0{idx + 1}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex gap-3 mt-4">
            {[
              { name: 'X', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
              { name: 'IG', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
              { name: 'IN', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h5v-8.366c0-4.62 6.135-4.958 6.135 0v8.366h5v-10.199c0-7.713-8.614-7.456-11.167-3.538v-2.263z"/></svg> }
            ].map((social) => (
              <div key={social.name} className="w-12 h-12 bg-white text-[#121ABC] flex items-center justify-center rounded-[14px] cursor-pointer hover:scale-105 transition-transform">
                {social.icon}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex justify-center items-center pt-8">
          <span className="text-[16px] opacity-60 font-medium tracking-wide">© 2026 GOLD SALIM OPEYEMI</span>
        </div>
      </div>

      <header className="absolute top-8 left-8 z-40">
        <Link href="/" className="font-bold text-xl tracking-[0.2em] flex items-start gap-1 cursor-pointer text-[#121ABC] decoration-transparent">
          G - S <span className="text-xs mt-[2px]">©</span>
        </Link>
      </header>

      <section className="relative w-full h-[85vh] flex flex-col justify-center overflow-hidden bg-[#EBEAE5]">
        <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[70%] h-[150px] bg-[#121ABC]/40 blur-[70px] pointer-events-none z-0"></div>

        <div className="relative z-10 w-full flex justify-center items-center pb-[5vh]">
          <h1 
            className="text-[#121ABC] text-[34vw] font uppercase leading-[0.75] m-0 p-0 tracking-tighter flex items-start select-none"
            style={{ fontFamily: 'Impact, sans-serif' }}
          >
            WORK
            <span className="text-[6.5vw] leading-none mt-[2vw] ml-1 font-black tracking-normal">
              ©26
            </span>
          </h1>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[25vh] z-20 overflow-hidden pointer-events-none">
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[160vw] md:w-[120vw] h-[250px] bg-[#F4F3EF]"
            style={{ 
              borderTopLeftRadius: '50% 100%', 
              borderTopRightRadius: '50% 100%' 
            }}
          ></div>
        </div>
      </section>

      <section className="relative w-full bg-[#F4F3EF] px-[6vw] pb-32 pt-8 md:pt-16 z-30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 md:gap-y-16">
          {projects.map((project, idx) => (
            <div key={idx} className="flex flex-col gap-3 group cursor-pointer">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#EBEAE5] relative">
                <img 
                  src={project.src} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" 
                />
              </div>

              <div 
                className="flex justify-between items-center text-[#121ABC] mt-1"
                style={{ fontFamily: 'Impact, sans-serif' }}
              >
                <h2 className="text-[20px] md:text-[24px] font-black uppercase tracking-tight m-0">
                  {project.title}
                </h2>
                <span className="text-[18px] md:text-[20px] font-black uppercase tracking-tight">
                  {project.year}
                </span>
              </div>
              
              {/* Project description */}
              <p className="text-[13px] md:text-[14px] font-bold uppercase tracking-wide text-[#121ABC]/60 mt-[-4px]">
                {project.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Skills/Tech Stack Section */}
        <div className="max-w-[1500px] mx-auto mt-20 pt-12 border-t border-[#121ABC]/10">
          <h3 
            className="text-[14px] font-black uppercase tracking-[0.15em] text-[#121ABC]/60 mb-6"
            style={{ fontFamily: 'Impact, sans-serif' }}
          >
            TECHNOLOGIES USED
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              'React.js', 
              'Next.js', 
              'TypeScript', 
              'Tailwind CSS', 
              'React Native',
              'Redux Toolkit',
              'Firebase',
              'Prisma'
            ].map((tech) => (
              <span 
                key={tech} 
                className="px-4 py-2 bg-[#121ABC]/5 rounded-full text-[13px] font-bold uppercase tracking-wide text-[#121ABC] border border-[#121ABC]/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}