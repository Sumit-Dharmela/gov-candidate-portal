'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Bell, 
  Menu, 
  X, 
  Sparkles, 
  FileText, 
  Award, 
  Compass, 
  UserCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { LiveAlert, CandidateProfile } from '@/lib/types';

interface HeaderProps {
  activeTab: 'applications' | 'admit-cards' | 'results' | 'vacancies';
  setActiveTab: (tab: 'applications' | 'admit-cards' | 'results' | 'vacancies') => void;
  alerts: LiveAlert[];
  candidate: CandidateProfile;
  onAlertClick: (alert: LiveAlert) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  alerts,
  candidate,
  onAlertClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  interface NavItem {
    id: 'applications' | 'admit-cards' | 'results' | 'vacancies';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    count: number | string;
    badge?: string;
    highlight?: boolean;
  }

  const navItems: NavItem[] = [
    { id: 'applications', label: 'My Applications', icon: FileText, count: 5 },
    { id: 'admit-cards', label: 'Admit Cards', icon: Award, count: 2, badge: 'Active' },
    { id: 'results', label: 'Results & Marks', icon: UserCheck, count: 1, badge: 'New' },
    { id: 'vacancies', label: 'Live Vacancies', icon: Compass, count: '39K+', highlight: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#050506]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Portal Identity */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-br from-[#5E6AD2] to-[#434eb0] text-white shadow-[0_0_20px_rgba(94,106,210,0.4)] border border-white/20">
            <ShieldCheck className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#050506]" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold tracking-tight text-white text-base">
                GovTrack<span className="text-[#8b95ec]">.portal</span>
              </span>
              <Badge variant="accent" dot pulse className="text-[10px] px-1.5 py-0 hidden sm:inline-flex">
                LIVE SSC SYNC
              </Badge>
            </div>
            <span className="text-[10px] text-[#8A8F98] font-mono tracking-wider">
              OFFICIAL CANDIDATE DESK
            </span>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-xl p-1 shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive
                    ? 'text-white bg-white/[0.08] shadow-[0_0_12px_rgba(94,106,210,0.2)] border border-white/[0.1]'
                    : 'text-[#8A8F98] hover:text-[#EDEDEF] hover:bg-white/[0.04]'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-[#8b95ec]' : 'text-[#8A8F98]'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-[#5E6AD2]/30 text-white' : 'bg-white/[0.06] text-[#8b95ec]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons & Profile Info */}
        <div className="flex items-center gap-2.5">
          {/* Real-time Notifications Popover Toggle */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-xl border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.08] text-[#8A8F98] hover:text-white transition-colors"
              title="Real-time Announcements"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#5E6AD2] ring-2 ring-[#050506] animate-pulse" />
            </button>

            {/* Notification Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-white/[0.1] bg-[#0a0a0c]/95 backdrop-blur-2xl p-3 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06] px-1">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-[#8b95ec]" />
                    <span className="text-xs font-semibold text-white">Live Official Alerts</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#8A8F98]">Real-time Feed</span>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      onClick={() => {
                        onAlertClick(alert);
                        setNotificationsOpen(false);
                      }}
                      className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <Badge variant="accent" className="text-[10px] py-0">
                          {alert.tag}
                        </Badge>
                        <span className="text-[10px] text-[#8A8F98] font-mono">{alert.timestamp}</span>
                      </div>
                      <p className="text-xs text-[#EDEDEF] group-hover:text-white leading-relaxed">
                        {alert.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Candidate Profile Pill (SSC Reg ID) */}
          <div className="hidden sm:flex items-center gap-2.5 pl-2 border-l border-white/[0.08]">
            <div className="h-8 w-8 rounded-full ring-1 ring-white/20 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-0.5 flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={candidate.photoUrl}
                alt={candidate.name}
                className="h-full w-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium text-white truncate max-w-[110px]">
                  {candidate.name}
                </span>
                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
              </div>
              <span className="text-[10px] text-[#8A8F98] font-mono">
                {candidate.registrationId.split('-').slice(1).join('-')}
              </span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-white/[0.06] bg-white/[0.03] text-[#8A8F98] hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#050506]/95 backdrop-blur-2xl px-4 py-4 space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={candidate.photoUrl}
              alt={candidate.name}
              className="h-10 w-10 object-cover rounded-full ring-1 ring-[#5E6AD2]"
            />
            <div>
              <div className="text-sm font-semibold text-white flex items-center gap-1">
                {candidate.name}
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              </div>
              <div className="text-xs text-[#8A8F98] font-mono">Reg: {candidate.registrationId}</div>
            </div>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#5E6AD2]/15 text-white border border-[#5E6AD2]/30'
                      : 'text-[#8A8F98] hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-[#8b95ec]" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="accent" className="text-[10px]">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
