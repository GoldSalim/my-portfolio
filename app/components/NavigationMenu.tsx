'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* =========================================
          HAMBURGER MENU BUTTON (CLOSED STATE)
      ========================================= */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-8 right-8 z-40 flex flex-col gap-[7px] p-2 cursor-pointer hover:opacity-70 transition-opacity"
        aria-label="Open menu"
        type="button"
      >
        <div className="w-[36px] h-[4px] bg-[#121ABC]"></div>
        <div className="w-[36px] h-[4px] bg-[#121ABC]"></div>
      </button>

      {/* =========================================
          BACKGROUND OVERLAY
      ========================================= */}
      <div 
        className={`fixed inset-0 bg-black/10 backdrop-blur-[2px] z-50 transition-all duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* =========================================
          SLIDE-IN SIDEBAR MENU (OPEN STATE)
      ========================================= */}
      {/* Background color matched to the deep royal blue in the image */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[480px] bg-[#2430C6] text-[#F1F0EA] z-[60] px-12 py-10 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-2xl flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Top Section: Close Button */}
        <div className="w-full flex justify-end pb-8">
          <button 
            onClick={() => setIsOpen(false)}
            className="py-2 cursor-pointer group"
            aria-label="Close menu"
            type="button"
          >
            {/* Single wide horizontal line */}
            <div className="w-[42px] h-[2px] bg-[#F1F0EA] opacity-90 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>

        {/* Middle Section: Navigation Links */}
        <nav className="flex flex-col w-full mt-6">
          {['HOME', 'ABOUT', 'WORK', "LET'S TALK"].map((item, idx) => (
            <Link 
              key={item}
              href={item === 'HOME' ? '/' : `/${item.toLowerCase().replace("'", "").replace(' ', '-')}`}
              onClick={() => setIsOpen(false)}
              className="group flex justify-between items-end border-b border-[#F1F0EA]/30 pb-3 pt-5 cursor-pointer hover:border-[#F1F0EA]/70 transition-colors decoration-transparent"
            >
              <h2 
                className="text-[64px] uppercase leading-[0.8] tracking-tight m-0"
                style={{ fontFamily: 'Impact, sans-serif', fontWeight: 'normal' }}
              >
                {item}
              </h2>
              {/* Numbers are heavily weighted, slightly muted, and aligned to the bottom baseline */}
              <span className="text-[18px] font-bold opacity-70 mb-1">
                0{idx + 1}
              </span>
            </Link>
          ))}
        </nav>

        {/* Social Icons (Directly beneath the last border) */}
        <div className="flex gap-3.5 mt-6">
          {[
            { name: 'X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
            { name: 'IG', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
            { name: 'IN', path: 'M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h5v-8.366c0-4.62 6.135-4.958 6.135 0v8.366h5v-10.199c0-7.713-8.614-7.456-11.167-3.538v-2.263z' }
          ].map((social) => (
            <div 
              key={social.name} 
              className="w-[42px] h-[42px] bg-white text-[#2430C6] flex items-center justify-center rounded-xl cursor-pointer hover:scale-105 transition-transform"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[20px] h-[20px]">
                <path d={social.path}/>
              </svg>
            </div>
          ))}
        </div>

        {/* Bottom Section (Links & Copyright Only) */}
        <div className="mt-auto flex flex-col gap-8 pb-4">
          
          {/* Template Links */}
          <div className="flex gap-5 text-[13px] font-bold tracking-wide">
            <Link 
              href="#" 
              className="hover:opacity-70 transition-opacity underline underline-offset-4 decoration-2 decoration-[#F1F0EA]/60"
            >
              ALL TEMPLATES
            </Link>
            <Link 
              href="#" 
              className="hover:opacity-70 transition-opacity underline underline-offset-4 decoration-2 decoration-[#F1F0EA]/60"
            >
              ALL ACCESS
            </Link>
          </div>
          
          {/* Copyright */}
          <div className="text-[14px] font-bold opacity-60 tracking-wide">
            © 2026 KAI FOX
          </div>

        </div>
      </div>
    </>
  );
}