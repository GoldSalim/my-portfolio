'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function ContactPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [copied, setCopied] = useState(null);
  const router = useRouter();

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'WORK', path: '/work' },
    { name: "LET'S TALK", path: null },
  ];

  const handleNavigation = (path) => {
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

  // Copy function with feedback
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.main 
        key="contact-page"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative w-full min-h-screen bg-[#EBEAE5] text-[#121ABC] font-sans overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] bg-[#121ABC]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] bg-[#121ABC]/5 rounded-full blur-3xl pointer-events-none"></div>

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
              {navItems.map((item, idx) => {
                if (item.path) {
                  return (
                    <div 
                      key={item.name}
                      onClick={() => handleNavigation(item.path)}
                      className="group flex justify-between items-center border-b border-white/20 py-5 cursor-pointer hover:border-white/80 transition-colors first:border-t w-full"
                    >
                      <h2 className="text-[56px] font-black uppercase leading-[0.85] tracking-tight">
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
                      <h2 className="text-[56px] font-black uppercase leading-[0.85] tracking-tight">
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

        {/* =========================================
            CONTENT SECTION
        ========================================= */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-32 md:py-40">
          <div className="w-full max-w-4xl">
            
            {/* Heading with Impact font */}
            <div className="mb-12 md:mb-16">
              <h1 
                className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-black uppercase leading-[0.85] tracking-tighter text-[#121ABC]"
                style={{ fontFamily: 'Impact, sans-serif' }}
              >
                LET'S TALK
              </h1>
              <p className="text-[16px] md:text-[20px] font-bold uppercase tracking-wider text-[#121ABC]/70 mt-2">
                Have a project? Let's work together.
              </p>
            </div>

            {/* Contact Info with advanced fonts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
              <div className="space-y-8">
                <div>
                  <h3 className="text-[14px] font-black uppercase tracking-[0.15em] text-[#121ABC]/50 mb-2" style={{ fontFamily: 'Impact, sans-serif' }}>
                    Email
                  </h3>
                  <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=goldsalim12@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[20px] md:text-[24px] font-bold text-[#121ABC] hover:opacity-70 transition-opacity duration-300 cursor-pointer"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    goldsalim12@gmail.com
                  </a>
                </div>

                <div>
                  <h3 className="text-[14px] font-black uppercase tracking-[0.15em] text-[#121ABC]/50 mb-2" style={{ fontFamily: 'Impact, sans-serif' }}>
                    Phone
                  </h3>
                  <div 
                    onClick={() => copyToClipboard('07031112497', 'phone')}
                    className="group flex items-center gap-3 cursor-pointer"
                  >
                    <p className="text-[20px] md:text-[24px] font-bold text-[#121ABC] transition-opacity duration-300 group-hover:opacity-70" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      07031112497
                    </p>
                    <span className="text-[12px] font-bold uppercase tracking-wider text-[#121ABC]/40 group-hover:text-[#121ABC]/80 transition-colors duration-300">
                      {copied === 'phone' ? '✅ Copied!' : '📋 Copy'}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-[14px] font-black uppercase tracking-[0.15em] text-[#121ABC]/50 mb-2" style={{ fontFamily: 'Impact, sans-serif' }}>
                    Location
                  </h3>
                  <p className="text-[20px] md:text-[24px] font-bold text-[#121ABC]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Lagos, Nigeria
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-[14px] font-black uppercase tracking-[0.15em] text-[#121ABC]/50 mb-2" style={{ fontFamily: 'Impact, sans-serif' }}>
                    GitHub
                  </h3>
                  <div 
                    onClick={() => copyToClipboard('https://github.com/GoldSalim', 'github')}
                    className="group flex items-center gap-3 cursor-pointer"
                  >
                    <a 
                      href="https://github.com/GoldSalim" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[20px] md:text-[24px] font-bold text-[#121ABC] hover:opacity-70 transition-opacity duration-300"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      github.com/GoldSalim
                    </a>
                    <span className="text-[12px] font-bold uppercase tracking-wider text-[#121ABC]/40 group-hover:text-[#121ABC]/80 transition-colors duration-300">
                      {copied === 'github' ? '✅ Copied!' : '📋 Copy'}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-[14px] font-black uppercase tracking-[0.15em] text-[#121ABC]/50 mb-2" style={{ fontFamily: 'Impact, sans-serif' }}>
                    Availability
                  </h3>
                  <p className="text-[20px] md:text-[24px] font-bold text-[#121ABC]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Open to Work
                  </p>
                </div>
              </div>
            </div>

            {/* Social links with advanced fonts */}
            <div className="flex flex-wrap gap-6 pt-8 border-t border-[#121ABC]/10">
              <a 
                href="#" 
                className="text-[16px] font-bold uppercase tracking-wider text-[#121ABC] hover:opacity-70 transition-opacity duration-300"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                Twitter/X
              </a>
              <a 
                href="#" 
                className="text-[16px] font-bold uppercase tracking-wider text-[#121ABC] hover:opacity-70 transition-opacity duration-300"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                Instagram
              </a>
              <a 
                href="#" 
                className="text-[16px] font-bold uppercase tracking-wider text-[#121ABC] hover:opacity-70 transition-opacity duration-300"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                LinkedIn
              </a>
            </div>

          </div>
        </div>

      </motion.main>
    </AnimatePresence>
  );
}