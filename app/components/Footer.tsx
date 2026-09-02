'use client';
import React from 'react';

export default function Footer() {
  return (
    <footer className="relative w-full h-screen bg-[#F4F3EF] overflow-hidden flex flex-col justify-end">
      
      {/* 
        ======================================================================
        THE BLUE INTERACTIVE WRAPPER (CONTAINING THE SCROLLING MARQUEE)
        ======================================================================
      */}
      <div className="relative w-full h-[85vh] bg-[#121ABC] overflow-hidden flex flex-col justify-center items-center">
        
        {/* Curved Inverse Top Trim Mask */}
        <div className="absolute top-0 left-0 w-full h-[150px] overflow-hidden pointer-events-none">
          <div 
            className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[160vw] md:w-[120vw] h-[260px] bg-[#F4F3EF]"
            style={{ 
              borderBottomLeftRadius: '50% 100%', 
              borderBottomRightRadius: '50% 100%' 
            }}
          ></div>
        </div>

        {/* 
          Vertical Infinite Marquee Stack 
          (Duplicated for seamless looping scroll)
        */}
        <div className="relative flex flex-col items-center select-none w-full max-h-[70%] overflow-hidden">
          <div className="animate-marquee-vertical flex flex-col items-center whitespace-nowrap">
            <h2 className="text-[#F4F3EF] text-[18vw] font-black uppercase tracking-tighter leading-[0.85]" style={{ fontFamily: 'Impact, sans-serif' }}>
              LET'S TALK
            </h2>
            <h2 className="text-[#F4F3EF] text-[18vw] font-black uppercase tracking-tighter leading-[0.85]" style={{ fontFamily: 'Impact, sans-serif' }}>
              LET'S TALK
            </h2>
            <h2 className="text-[#F4F3EF] text-[18vw] font-black uppercase tracking-tighter leading-[0.85]" style={{ fontFamily: 'Impact, sans-serif' }}>
              LET'S TALK
            </h2>
          </div>
          <div className="animate-marquee-vertical flex flex-col items-center whitespace-nowrap absolute top-0" aria-hidden="true">
            <h2 className="text-[#F4F3EF] text-[18vw] font-black uppercase tracking-tighter leading-[0.85]" style={{ fontFamily: 'Impact, sans-serif' }}>
              LET'S TALK
            </h2>
            <h2 className="text-[#F4F3EF] text-[18vw] font-black uppercase tracking-tighter leading-[0.85]" style={{ fontFamily: 'Impact, sans-serif' }}>
              LET'S TALK
            </h2>
            <h2 className="text-[#F4F3EF] text-[18vw] font-black uppercase tracking-tighter leading-[0.85]" style={{ fontFamily: 'Impact, sans-serif' }}>
              LET'S TALK
            </h2>
          </div>
        </div>

        {/* Link / Call-to-action Layer */}
        <a 
          href="mailto:hello@example.com" 
          className="absolute inset-0 z-20 flex items-end justify-center pb-[12vh] group decoration-transparent"
        >
          <span 
            className="text-[#F4F3EF] text-lg font-medium tracking-wide lowercase italic opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            (book a call)
          </span>
        </a>

        {/* Bottom Utility Bar (Copyright / Legal) */}
        <div className="absolute bottom-8 left-[6vw] right-[6vw] z-30 flex justify-between items-center text-[#F4F3EF] text-xs font-semibold uppercase tracking-wider opacity-80">
          <div>© 2026 KAI FOX</div>
          <div>BACK TO TOP ↑</div>
        </div>

      </div>

      {/* Global Style Inject for the Vertical Marquee Tailwind Missing Layer */}
      <style jsx global>{`
        @keyframes marqueeVertical {
          0% { transform: translateY(0%); }
          100% { transform: translateY(-100%); }
        }
        .animate-marquee-vertical {
          animation: marqueeVertical 14s linear infinite;
        }
      `}</style>
    </footer>
  );
}