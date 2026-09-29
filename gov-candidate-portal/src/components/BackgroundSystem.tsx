'use client';

import React from 'react';

export const BackgroundSystem: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Layer 1 — Base Gradient */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0a0a0f_0%,#050506_50%,#020203_100%)]" 
      />

      {/* Layer 2 — Noise Texture */}
      <div 
        className="absolute inset-0 bg-noise-linear opacity-20 mix-blend-overlay"
      />

      {/* Layer 3 — Animated Gradient Blobs */}
      {/* Primary Blob: Top-center, 900x1400px, accent #5E6AD2 at 22% */}
      <div
        className="absolute -top-[250px] left-1/2 -translate-x-1/2 w-[1100px] h-[650px] rounded-full 
                   bg-gradient-to-b from-[#5E6AD2]/25 via-[#6872D9]/15 to-transparent 
                   blur-[140px] animate-linear-float opacity-80"
      />

      {/* Secondary Blob: Left side, 600x800px, purple/pink mix at 14% */}
      <div
        className="absolute top-[35%] -left-[200px] w-[650px] h-[750px] rounded-full 
                   bg-gradient-to-tr from-[#7c3aed]/16 via-[#a855f7]/10 to-transparent 
                   blur-[130px] animate-linear-float-slow opacity-60"
      />

      {/* Tertiary Blob: Right side, 500x700px, indigo/cyan mix at 12% */}
      <div
        className="absolute top-[45%] -right-[150px] w-[580px] h-[680px] rounded-full 
                   bg-gradient-to-bl from-[#3b82f6]/14 via-[#5E6AD2]/12 to-transparent 
                   blur-[120px] animate-linear-float opacity-70"
      />

      {/* Bottom accent blob: Lower area, pulsing at 10% */}
      <div
        className="absolute -bottom-[200px] left-1/3 w-[800px] h-[500px] rounded-full 
                   bg-[#5E6AD2]/12 blur-[150px] animate-pulse-slow"
      />

      {/* Layer 4 — Grid Overlay (64px) */}
      <div 
        className="absolute inset-0 bg-grid-linear opacity-35" 
      />
    </div>
  );
};
