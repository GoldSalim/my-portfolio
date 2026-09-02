'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  
  // State to control the curve of the divider. 100 = fully curved, 0 = straight.
  const [curve, setCurve] = useState(100);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let newCurve = 100 - (scrollY / 4); 
      if (newCurve < 0) newCurve = 0;
      setCurve(newCurve);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items with proper paths
  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'WORK', path: '/work' },
    { name: "LET'S TALK", path: '/contact' },
  ];

  return (
    <main className="w-full bg-[#f5f4ef] text-[#1821c9] selection:bg-[#1821c9] selection:text-white font-sans">
      
      {/* =========================================
          NAVIGATION MENU & OVERLAYS
      ========================================= */}
      {/* --- BACKGROUND OVERLAY (CLICK OUTSIDE TO CLOSE) --- */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* --- MENU BUTTON (VISIBLE WHEN CLOSED) --- */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-8 right-8 z-30 flex flex-col gap-[10px] p-2 cursor-pointer hover:opacity-80 transition-opacity"
        aria-label="Open menu"
      >
        <div className="w-9 h-[3px] bg-[#1821c9] rounded-sm"></div>
        <div className="w-9 h-[3px] bg-[#1821c9] rounded-sm"></div>
      </button>

      {/* --- FULLSCREEN OVERLAY MENU --- */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[480px] bg-[#1821c9] text-white z-50 px-10 pb-12 pt-10 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-2xl flex flex-col justify-between overflow-hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Top Section: Close Button + Menu Items */}
        <div className="relative w-full flex flex-col h-full">
          
          {/* --- CLOSE BUTTON --- */}
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-0 right-0 w-12 h-12 flex items-start justify-end cursor-pointer group"
            aria-label="Close menu"
          >
            <div className="w-10 h-[2px] bg-white transition-transform duration-300 group-hover:rotate-45"></div>
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col mt-28 gap-0 flex-grow">
            {navItems.map((item, idx) => (
              <Link 
                key={item.name}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className="group flex justify-between items-center border-b border-white/20 py-5 cursor-pointer hover:border-white/80 transition-colors first:border-t w-full"
              >
                <h2 className="text-[56px] font-black uppercase leading-[0.85] tracking-tight font-condensed">
                  {item.name}
                </h2>
                <span className="text-[18px] font-bold opacity-60 group-hover:opacity-100 transition-opacity tracking-wider">
                  0{idx + 1}
                </span>
              </Link>
            ))}
          </nav>

          {/* Social Icons */}
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

        {/* Bottom Section: Copyright */}
        <div className="w-full flex justify-center items-center pt-8">
          <span className="text-[16px] opacity-60 font-medium tracking-wide">© 2026 GOLD SALIM OPEYEMI</span>
        </div>
      </div>

      {/* =========================================
          HEADER LOGO
      ========================================= */}
      <header className="fixed top-8 left-8 z-50">
        <Link href="/" className="font-bold text-xl tracking-[0.2em] flex items-start gap-1 cursor-pointer text-[#1821c9]">
          G - S <span className="text-xs mt-[2px]">©</span>
        </Link>
      </header>
      
      {/* =========================================
          HERO SECTION (100vh)
      ========================================= */}
     <section className="relative w-full min-h-[90vh] md:min-h-screen bg-[#f5f4ef] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 overflow-hidden text-[#141b9c] flex flex-col justify-between my-4 border border-[#141b9c]/10">
  
  {/* Central Hero Area (Typography + Rotated Center Image) */}
  <div className="relative w-full flex-1 flex items-center justify-center min-h-[380px] md:min-h-[480px]">
    
    {/* Giant Background Typography */}
    <div className="w-full flex justify-between items-center pointer-events-none select-none z-0">
      <h1 
        className="text-[26vw] md:text-[20vw] leading-none m-0 p-0 uppercase text-[#141b9c] tracking-normal"
        style={{ 
          fontFamily: 'Impact, sans-serif',
          transform: 'scaleY(1.25)',
          transformOrigin: 'bottom'
        }}
      >
        GOLD
      </h1>
      <h1 
        className="text-[26vw] md:text-[20vw] leading-none m-0 p-0 uppercase text-[#141b9c] tracking-normal"
        style={{ 
          fontFamily: 'Impact, sans-serif',
          transform: 'scaleY(1.25)',
          transformOrigin: 'bottom'
        }}
      >
        SALIM
      </h1>
    </div>

    {/* Central Portrait Image */}
    <div className="absolute top-54 left-152 -translate-x-1/2 -translate-y-1/2 z-10 w-[14vw] min-w-[180px] max-w-[280px] aspect-[1/1.1] -rotate-[-12deg] rounded-[1.2rem] md:rounded-[1.5rem] overflow-hidden shadow-2xl bg-gray-200 ">
      <Image 
        src="/salim.jpeg" 
        alt="Gold Salim Portrait" 
        fill
        className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
        priority
        sizes="(max-width: 768px) 50vw, 22vw"
      />
    </div>

  </div>

  {/* Card Bottom Info (Bounded inside the card container) */}
  <div className="relative z-20 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pt-6">
    
    {/* Bottom Left Inside Card */}
<div className="flex flex-col gap-5 text-[13px] md:text-[14px] font-bold tracking-tight leading-[1.4] text-[#141b9c]">
  <div>
    <p>FRONTEND DEVELOPER</p>
    <p>BUILDING RESPONSIVE SYSTEMS</p>
    <p>FOR MODERN BRANDS</p>
  </div>
  <div className="relative">
    <p>LOCATION: LAGOS, NG</p>
    <p className="flex items-center flex-wrap gap-1">
      AVAILABLE FOR FREELANCE:&nbsp;
      <a 
        href="https://mail.google.com/mail/?view=cm&fs=1&to=goldsalim12@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-70 transition-opacity duration-300 underline underline-offset-4 decoration-1 pointer-events-auto cursor-pointer"
      >
        goldsalim12@gmail.com
      </a>
    </p>
    
    {/* Hand-drawn Annotation: (contact me) */}
    <div className="absolute -top-7 left-[260px] md:left-[280px] flex items-center gap-1.5 text-[18px] font-medium opacity-90 pointer-events-none" style={{ fontFamily: 'Caveat, cursive', fontStyle: 'italic' }}>
      <svg width="40" height="40" viewBox="0 0 50 50" fill="none" className="translate-y-3 -translate-x-1">
        <path d="M 45 10 Q 25 5 10 35" stroke="#141b9c" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 5 25 L 10 35 L 20 32" stroke="#141b9c" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="whitespace-nowrap -translate-y-3">(contact me)</span>
    </div>
  </div>
</div>
    {/* Bottom Right Inside Card */}
    <div className="flex flex-col items-start md:items-end text-[13px] md:text-[14px] font-bold tracking-tight leading-[1.4] text-[#141b9c] text-left md:text-right pointer-events-auto">
      <p className="cursor-pointer transition-all duration-300 hover:-translate-x-2 hover:opacity-60">REACT.JS</p>
      <p className="cursor-pointer transition-all duration-300 hover:-translate-x-2 hover:opacity-60">NEXT.JS</p>
      <p className="cursor-pointer transition-all duration-300 hover:-translate-x-2 hover:opacity-60">TYPESCRIPT</p>
      <p className="cursor-pointer transition-all duration-300 hover:-translate-x-2 hover:opacity-60 relative">
        TAILWIND CSS
        
        {/* Hand-drawn Annotation: (hover us) */}
        <span className="absolute top-[-4px] right-[170px] md:right-[190px] hidden md:flex items-center gap-1.5 text-[18px] font-medium opacity-90 pointer-events-none w-max" style={{ fontFamily: 'Caveat, cursive', fontStyle: 'italic' }}>
          <span className="whitespace-nowrap translate-y-4">(hover us)</span>
          <svg width="40" height="40" viewBox="0 0 50 50" fill="none" className="translate-x-0 -translate-y-1">
            <path d="M 10 45 Q 35 45 45 10" stroke="#141b9c" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 30 15 L 45 10 L 43 25" stroke="#141b9c" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </p>
    </div>

  </div>
</section>

      {/* =========================================
          ABOUT SECTION
      ========================================= */}
    <section className="relative w-full bg-[#f5f4ef] px-6 py-20 lg:px-16 lg:py-32 overflow-hidden z-10 text-[#141b9c]">
  <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12 items-center">
    
    {/* Left Side: Typography & Signature */}
    <div className="md:col-span-5 flex flex-col gap-6 lg:pr-8">
      <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter origin-left" style={{ transform: 'scaleY(1.2)' }}>
        HI! I AM GOLD SALIM
      </h2>
      
      <p className="text-[14px] lg:text-[15px] font-bold uppercase tracking-tight leading-[1.5] mt-4">
        FROM LAGOS TO THE WORLD, GOLD SALIM OPEYEMI IS A FRONTEND DEVELOPER KNOWN FOR BUILDING RESPONSIVE, HIGH-PERFORMANCE WEB APPLICATIONS.
      </p>
      
      <p className="text-[14px] lg:text-[15px] font-bold uppercase tracking-tight leading-[1.5]">
        A RESULTS-DRIVEN FRONTEND DEVELOPER WITH 3+ YEARS OF EXPERIENCE BUILDING RESPONSIVE, HIGH-PERFORMANCE WEB APPLICATIONS USING HTML5, CSS3, JAVASCRIPT, TYPESCRIPT, REACT.JS, NEXT.JS, TAILWIND CSS, AND REACT NATIVE. PASSIONATE ABOUT WRITING CLEAN, MAINTAINABLE CODE AND SOLVING COMPLEX PROBLEMS.
      </p>

      {/* Hand-drawn Signature SVG */}
      <div className="mt-4 opacity-100">
        <svg width="200" height="80" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 20 50 C 30 20, 60 10, 80 30 C 100 50, 60 70, 40 50 C 20 30, 100 25, 130 40 C 160 55, 180 35, 190 30" 
                stroke="#141b9c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 120 40 L 140 25" stroke="#141b9c" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="175" cy="45" r="2" fill="#141b9c" />
        </svg>
      </div>
    </div>

    {/* Right Side: Image with Badge and Buttons */}
    <div className="md:col-span-7 relative w-full pt-12 md:pt-0">
      
      {/* Spinning Circular Badge - Overlapping the top left corner */}
      <div className="absolute -top-12 -left-8 md:-top-16 md:-left-12 lg:-top-24 lg:-left-20 w-[160px] h-[160px] md:w-[200px] md:h-[200px] lg:w-[240px] lg:h-[240px] z-40 flex items-center justify-center">
        {/* Blurred glassmorphism backing */}
        <div className="absolute inset-4 rounded-full backdrop-blur-xl bg-[#f5f4ef]/30 z-0"></div>
        
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible z-10 animate-[spin_12s_linear_infinite]">
          <path id="circlePath" d="M 50, 50 m -34, 0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" fill="none" />
          <text className="text-[11px] font-black fill-[#141b9c] tracking-[0.16em] uppercase">
            <textPath href="#circlePath" startOffset="0%">
              FRONTEND DEVELOPER • FRONTEND DEVELOPER •
            </textPath>
          </text>
        </svg>
      </div>

      {/* Main Portfolio Image */}
      <div className="relative w-full aspect-[4/3.5] rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden bg-gray-200 shadow-lg">
        <img 
          src="/salim.jpeg" 
          alt="Gold Salim working on designs" 
          className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
        />
      </div>

    </div>
  </div>
</section>
      {/* =========================================
          WORK SECTION
      ========================================= */}
      <section className="relative w-full bg-[#f5f4ef] py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-12 flex justify-center items-center overflow-hidden">
  <div className="flex items-start justify-center select-none text-[#1821c9]">
    <h2 
      className="text-[25vw] md:text-[27vw] font-bold uppercase leading-none m-0 p-0 tracking-normal"
      style={{ 
        fontFamily: 'Impact, sans-serif',
        transform: 'scaleY(1.3)',
        transformOrigin: 'center'
      }}
    >
      WORK
    </h2>
    <span 
      className="text-[5vw] md:text-[5.5vw] font-bold uppercase leading-none ml-[0.3vw] mt-[0.5vw]"
      style={{ 
        fontFamily: 'Impact, sans-serif',
        transform: 'scaleY(1.25)',
        transformOrigin: 'top left'
      }}
    >
      (05)
    </span>
  </div>
</section>
      {/* =========================================
          PROJECT GRID SECTION
      ========================================= */}
      <section className="relative w-full bg-[#f5f4ef] px-6 lg:px-16 pb-20 lg:pb-32 z-10">
        
        {/* --- ROW 1 --- */}
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 lg:gap-10">
          
          {/* Left Project: Core Vision (Narrower Column) */}
          <div className="md:col-span-5 flex flex-col gap-2 lg:gap-3">
            <div className="relative w-full aspect-[4/3] rounded-[1rem] overflow-hidden bg-gray-200">
              <Image 
                src="/resume1.png" 
                alt="Core Vision Project" 
                fill
                className="object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <div 
              className="flex justify-between items-start font-bold uppercase text-[#1821c9] text-[18px] md:text-[20px] lg:text-[24px] tracking-[0.02em] leading-none mt-2"
              style={{ fontFamily: 'Impact, sans-serif' }}
            >
              <h3>RESUME APP</h3>
              <span>© 26</span>
            </div>
          </div>

          {/* Right Project: Form Grid (Wider Column) */}
          <div className="md:col-span-7 flex flex-col gap-2 lg:gap-3 mt-12 md:mt-0">
            <div className="relative w-full aspect-[16/11] rounded-[1rem] overflow-hidden bg-gray-200">
              <Image 
                src="/ecomerce.png" 
                alt="Form Grid Project" 
                fill
                className="object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-105"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
            <div 
              className="flex justify-between items-start font-bold uppercase text-[#1821c9] text-[18px] md:text-[20px] lg:text-[24px] tracking-[0.02em] leading-none mt-2"
              style={{ fontFamily: 'Impact, sans-serif' }}
            >
              <h3>ECOMERCE WEBSITE</h3>
              <span>© 26</span>
            </div>
          </div>

        </div>

        {/* --- ROW 2 --- */}
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 lg:gap-10 mt-16 md:mt-24 lg:mt-32">
          
          {/* Left Project: Frame Concept (Wider Column) */}
          <div className="md:col-span-7 flex flex-col gap-2 lg:gap-3">
            <div className="relative w-full aspect-[16/11] rounded-[1rem] overflow-hidden bg-gray-200">
              <Image 
                src="/taskmanager.jpg" 
                alt="Frame Concept Project" 
                fill
                className="object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-105"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
            <div 
              className="flex justify-between items-start font-bold uppercase text-[#1821c9] text-[18px] md:text-[20px] lg:text-[24px] tracking-[0.02em] leading-none mt-2"
              style={{ fontFamily: 'Impact, sans-serif' }}
            >
              <h3>TASK MANAGER</h3>
              <span>© 25</span>
            </div>
          </div>

          {/* Right Project: Modern Flow (Narrower Column) */}
          <div className="md:col-span-5 flex flex-col gap-2 lg:gap-3 mt-12 md:mt-0">
            <div className="relative w-full aspect-[4/3] rounded-[1rem] overflow-hidden bg-gray-200">
              <Image 
                src="/bussiness.jpg" 
                alt="Modern Flow Project" 
                fill
                className="object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <div 
              className="flex justify-between items-start font-bold uppercase text-[#1821c9] text-[18px] md:text-[20px] lg:text-[24px] tracking-[0.02em] leading-none mt-2"
              style={{ fontFamily: 'Impact, sans-serif' }}
            >
              <h3>BUSSINESS WEBSITE</h3>
              <span>© 24</span>
            </div>
          </div>

        </div>

        {/* --- ROW 3 --- */}
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 lg:gap-10 mt-16 md:mt-24 lg:mt-32">
          
          {/* Empty Left Column (Takes up 5 columns to push the right content over) */}
          <div className="hidden md:block md:col-span-5"></div>

          {/* Right Project: Dark Frame (Wider Column) */}
          <div className="md:col-span-7 flex flex-col gap-2 lg:gap-3">
            <div className="relative w-full aspect-[16/11] rounded-[1rem] overflow-hidden bg-gray-200">
              <Image 
                src="/dasboard.jpg" 
                alt="Dark Frame Project" 
                fill
                className="object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-105"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
            <div 
              className="flex justify-between items-start font-bold uppercase text-[#1821c9] text-[18px] md:text-[20px] lg:text-[24px] tracking-[0.02em] leading-none mt-2"
              style={{ fontFamily: 'Impact, sans-serif' }}
            >
              <h3>MODERN DASHBOARD</h3>
              <span>© 24</span>
            </div>
          </div>

        </div>

      </section>

      {/* =========================================
          FOOTER SECTION
      ========================================= */}
      {/* <Footer /> */}

    </main>
  );
}