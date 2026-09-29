'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  Award, 
  ArrowRight, 
  Download, 
  ExternalLink,
  Search,
  Filter,
  AlertCircle
} from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Application, AdmitCard, ExamResult } from '@/lib/types';

interface ApplicationsTabProps {
  applications: Application[];
  admitCards: AdmitCard[];
  results: ExamResult[];
  onViewAdmitCard: (card: AdmitCard) => void;
  onViewResult: (result: ExamResult) => void;
  onSelectApplication: (app: Application) => void;
}

export const ApplicationsTab: React.FC<ApplicationsTabProps> = ({
  applications,
  admitCards,
  results,
  onViewAdmitCard,
  onViewResult,
  onSelectApplication,
}) => {
  const [filter, setFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApps = applications.filter((app) => {
    const matchesFilter = 
      filter === 'ALL' ||
      (filter === 'QUALIFIED' && app.status === 'TIER_QUALIFIED') ||
      (filter === 'ADMIT_CARD' && app.status === 'ADMIT_CARD_RELEASED') ||
      (filter === 'PENDING' && (app.status === 'SUBMITTED' || app.status === 'SCRUTINY_PASSED'));
    
    const matchesSearch = 
      app.examName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.postApplied.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: Application['status']) => {
    switch (status) {
      case 'TIER_QUALIFIED':
        return <Badge variant="accent" dot pulse>Tier-I Qualified</Badge>;
      case 'ADMIT_CARD_RELEASED':
        return <Badge variant="success" dot pulse>Admit Card Out</Badge>;
      case 'EXAM_COMPLETED':
        return <Badge variant="purple" dot>Exam Done</Badge>;
      case 'SCRUTINY_PASSED':
        return <Badge variant="default">Scrutiny Accepted</Badge>;
      default:
        return <Badge variant="outline">Submitted</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8A8F98]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search applied exams, post name, or roll no..."
            className="w-full bg-[#0a0a0c] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-[#8A8F98] focus:outline-none focus:border-[#5E6AD2] focus:ring-1 focus:ring-[#5E6AD2]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'ALL', label: 'All Applications' },
            { id: 'QUALIFIED', label: 'Qualified' },
            { id: 'ADMIT_CARD', label: 'Admit Card Ready' },
            { id: 'PENDING', label: 'In Review' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                filter === item.id
                  ? 'bg-white/[0.08] text-white border border-white/[0.12] shadow-sm'
                  : 'text-[#8A8F98] hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApps.map((app) => {
          const appAdmitCard = admitCards.find(ac => ac.applicationId === app.id);
          const appResult = results.find(r => r.applicationId === app.id);

          return (
            <SpotlightCard key={app.id} className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#5E6AD2]/15 text-[#8b95ec] border border-[#5E6AD2]/25">
                      {app.examCategory}
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight">
                      {app.examName}
                    </h3>
                    {getStatusBadge(app.status)}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8A8F98] font-mono">
                    <span>Post: <strong className="text-[#EDEDEF]">{app.postApplied}</strong></span>
                    <span className="hidden sm:inline text-white/10">•</span>
                    <span>Reg No: <strong className="text-[#EDEDEF]">{app.registrationNumber}</strong></span>
                    <span className="hidden sm:inline text-white/10">•</span>
                    <span>Roll: <strong className="text-[#EDEDEF]">{app.rollNumber}</strong></span>
                    <span className="hidden sm:inline text-white/10">•</span>
                    <span>Applied: {app.appliedDate}</span>
                  </div>
                </div>

                {/* Direct contextual actions */}
                <div className="flex items-center gap-2 flex-wrap">
                  {appAdmitCard && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onViewAdmitCard(appAdmitCard)}
                      className="text-xs"
                    >
                      <Award className="h-3.5 w-3.5" />
                      <span>View Hall Ticket</span>
                    </Button>
                  )}

                  {appResult && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onViewResult(appResult)}
                      className="text-xs"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      <span>View Scorecard</span>
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSelectApplication(app)}
                    className="text-xs"
                  >
                    <span>Full Details</span>
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Progress Timeline Stepper */}
              <div className="pt-4">
                <div className="text-[11px] font-mono text-[#8A8F98] uppercase tracking-wider mb-3">
                  Recruitment Life Cycle Pipeline
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {app.timeline.map((step, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl border transition-all ${
                        step.current
                          ? 'bg-[#5E6AD2]/10 border-[#5E6AD2]/40 shadow-[0_0_15px_rgba(94,106,210,0.15)]'
                          : step.completed
                          ? 'bg-white/[0.03] border-white/[0.08]'
                          : 'bg-white/[0.01] border-white/[0.04] opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-mono text-[#8A8F98]">
                          0{idx + 1}
                        </span>
                        {step.completed ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        ) : step.current ? (
                          <Clock className="h-3.5 w-3.5 text-[#8b95ec] animate-pulse" />
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-white/20" />
                        )}
                      </div>
                      <div className={`text-xs font-medium leading-tight ${
                        step.current ? 'text-white' : step.completed ? 'text-[#EDEDEF]' : 'text-[#8A8F98]'
                      }`}>
                        {step.title}
                      </div>
                      <div className="text-[10px] text-[#8A8F98] mt-1 font-mono">
                        {step.date}
                      </div>
                      {step.note && (
                        <div className="text-[10px] text-[#8b95ec] mt-1 font-mono font-medium truncate">
                          {step.note}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          );
        })}

        {filteredApps.length === 0 && (
          <SpotlightCard className="p-12 text-center">
            <AlertCircle className="h-8 w-8 text-[#8A8F98] mx-auto mb-3" />
            <p className="text-white font-medium text-sm">No applications found matching your criteria</p>
            <p className="text-[#8A8F98] text-xs mt-1">Try adjusting your search terms or filter selection.</p>
          </SpotlightCard>
        )}
      </div>
    </div>
  );
};
