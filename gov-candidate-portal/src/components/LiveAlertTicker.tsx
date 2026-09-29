'use client';

import React, { useState, useEffect } from 'react';
import { Radio, ChevronRight, Bell, Sparkles } from 'lucide-react';
import { LiveAlert } from '@/lib/types';

interface LiveAlertTickerProps {
  alerts: LiveAlert[];
  onSelectAlert: (alert: LiveAlert) => void;
}

export const LiveAlertTicker: React.FC<LiveAlertTickerProps> = ({ alerts, onSelectAlert }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (alerts.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % alerts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [alerts.length]);

  if (alerts.length === 0) return null;
  const currentAlert = alerts[currentIndex];

  return (
    <div className="w-full bg-[#0a0a0c]/80 border-b border-white/[0.06] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3 text-xs">
        
        {/* Live Badge */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono text-[11px] font-semibold text-emerald-400 tracking-wider hidden sm:inline-block">
            LIVE RADAR:
          </span>
        </div>

        {/* Ticker Content with Smooth Transition */}
        <div 
          onClick={() => onSelectAlert(currentAlert)}
          className="flex-1 flex items-center gap-2 overflow-hidden cursor-pointer hover:text-white transition-colors group truncate"
        >
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-white/[0.08] text-[#8b95ec] border border-white/[0.06] flex-shrink-0">
            {currentAlert.category}
          </span>
          <span className="text-[#EDEDEF] group-hover:text-white truncate transition-colors text-xs font-normal">
            {currentAlert.title}
          </span>
          <span className="text-[10px] text-[#8A8F98] font-mono hidden md:inline-block flex-shrink-0">
            • {currentAlert.timestamp}
          </span>
        </div>

        {/* Quick Action Button */}
        <button
          onClick={() => onSelectAlert(currentAlert)}
          className="flex items-center gap-1 text-[11px] font-medium text-[#8b95ec] hover:text-white transition-colors flex-shrink-0 cursor-pointer"
        >
          <span className="hidden sm:inline">View details</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
