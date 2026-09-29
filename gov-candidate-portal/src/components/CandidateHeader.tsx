'use client';

import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  FileCheck, 
  Award, 
  Clock, 
  MapPin, 
  Fingerprint, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { SpotlightCard } from './ui/SpotlightCard';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { CandidateProfile, Application, AdmitCard, ExamResult } from '@/lib/types';

interface CandidateHeaderProps {
  candidate: CandidateProfile;
  applications: Application[];
  admitCards: AdmitCard[];
  results: ExamResult[];
  onOpenApply: () => void;
  onViewAdmitCard: (card: AdmitCard) => void;
}

export const CandidateHeader: React.FC<CandidateHeaderProps> = ({
  candidate,
  applications,
  admitCards,
  results,
  onOpenApply,
  onViewAdmitCard,
}) => {
  const activeAdmitCards = admitCards.filter(ac => ac.downloadAvailable);
  const qualifiedCount = results.filter(r => r.qualified).length;
  const nextAdmitCard = activeAdmitCards[0];

  return (
    <div className="space-y-4">
      {/* Top Banner & Profile Overview */}
      <SpotlightCard className="p-6 md:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Candidate Identity */}
          <div className="flex items-start sm:items-center gap-5">
            <div className="relative flex-shrink-0">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl ring-2 ring-[#5E6AD2]/50 p-1 bg-gradient-to-b from-[#5E6AD2]/20 to-transparent shadow-[0_0_30px_rgba(94,106,210,0.25)] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={candidate.photoUrl}
                  alt={candidate.name}
                  className="h-full w-full object-cover rounded-xl"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#050506] p-0.5 rounded-full ring-1 ring-emerald-500/50">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-white/70">
                  {candidate.name}
                </h1>
                <Badge variant="success" dot pulse className="text-[11px]">
                  Aadhaar Verified
                </Badge>
                <Badge variant="accent" className="text-[11px] font-mono">
                  {candidate.category}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8A8F98] font-mono">
                <span className="flex items-center gap-1.5">
                  <Fingerprint className="h-3.5 w-3.5 text-[#8b95ec]" />
                  Reg ID: <strong className="text-[#EDEDEF]">{candidate.registrationId}</strong>
                </span>
                <span className="hidden sm:inline text-white/10">•</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#8b95ec]" />
                  {candidate.state}
                </span>
                <span className="hidden sm:inline text-white/10">•</span>
                <span>DOB: {candidate.dob}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 flex-wrap">
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                if (nextAdmitCard) onViewAdmitCard(nextAdmitCard);
              }}
              className="text-xs"
            >
              <Award className="h-3.5 w-3.5 text-[#8b95ec]" />
              <span>Download Hall Ticket</span>
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={onOpenApply}
              className="text-xs"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Explore New Vacancies</span>
            </Button>
          </div>
        </div>
      </SpotlightCard>

      {/* Asymmetric Bento Quick KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        
        {/* KPI 1: Total Applied */}
        <SpotlightCard className="p-4 sm:p-5">
          <div className="flex items-center justify-between text-[#8A8F98] mb-2">
            <span className="text-xs font-mono tracking-wider uppercase">Active Apps</span>
            <FileCheck className="h-4 w-4 text-[#8b95ec]" />
          </div>
          <div className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            {applications.length}
          </div>
          <div className="text-[11px] text-[#8A8F98] mt-1 flex items-center gap-1">
            <span className="text-emerald-400 font-medium">100% verified</span> scrutiny
          </div>
        </SpotlightCard>

        {/* KPI 2: Admit Cards Ready */}
        <SpotlightCard className="p-4 sm:p-5">
          <div className="flex items-center justify-between text-[#8A8F98] mb-2">
            <span className="text-xs font-mono tracking-wider uppercase">Hall Tickets</span>
            <Award className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-semibold text-white tracking-tight flex items-baseline gap-2">
            {activeAdmitCards.length}
            <Badge variant="success" className="text-[10px] py-0">Ready</Badge>
          </div>
          <div className="text-[11px] text-[#8A8F98] mt-1">
            SSC CHSL (18 Oct 2026)
          </div>
        </SpotlightCard>

        {/* KPI 3: Qualified Stages */}
        <SpotlightCard className="p-4 sm:p-5">
          <div className="flex items-center justify-between text-[#8A8F98] mb-2">
            <span className="text-xs font-mono tracking-wider uppercase">Qualified</span>
            <Sparkles className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-semibold text-white tracking-tight flex items-baseline gap-2">
            {qualifiedCount} <span className="text-xs text-[#8A8F98] font-normal">Tier-I Cleared</span>
          </div>
          <div className="text-[11px] text-amber-300/80 mt-1 font-mono">
            Score: 158.45 (Top 1.5%)
          </div>
        </SpotlightCard>

        {/* KPI 4: Next Examination Countdown */}
        <SpotlightCard className="p-4 sm:p-5">
          <div className="flex items-center justify-between text-[#8A8F98] mb-2">
            <span className="text-xs font-mono tracking-wider uppercase">Upcoming Exam</span>
            <Clock className="h-4 w-4 text-[#8b95ec]" />
          </div>
          <div className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            18 Oct 2026
          </div>
          <div className="text-[11px] text-[#8b95ec] mt-1 font-mono">
            SSC CHSL • Shift 1 (09:00 AM)
          </div>
        </SpotlightCard>

      </div>
    </div>
  );
};
