'use client';

import React from 'react';
import { 
  X, 
  Building2, 
  Users, 
  Banknote, 
  GraduationCap, 
  Calendar, 
  Clock, 
  ExternalLink,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { JobVacancy } from '@/lib/types';
import { formatNumber } from '@/lib/utils';

interface JobDetailsModalProps {
  job: JobVacancy | null;
  isOpen: boolean;
  isApplied: boolean;
  onClose: () => void;
  onApply: (job: JobVacancy) => void;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  job,
  isOpen,
  isApplied,
  onClose,
  onApply,
}) => {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 rounded-2xl border border-white/10 bg-[#0a0a0c] text-[#EDEDEF] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#050506]">
          <div className="flex items-center gap-2">
            <Badge variant="accent" className="font-mono text-[10px]">
              {job.category}
            </Badge>
            <span className="text-xs font-semibold text-white">
              Official Vacancy Dossier
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg border border-white/10 hover:bg-white/10 text-[#8A8F98] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
              {job.title}
            </h3>
            <p className="text-xs text-[#8A8F98] flex items-center gap-1.5 mt-1 font-mono">
              <Building2 className="h-3.5 w-3.5 text-[#8b95ec]" />
              <span>{job.organization}</span>
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <span className="text-[#8A8F98] block text-[10px] uppercase">Total Posts</span>
              <span className="text-lg font-bold text-white">{formatNumber(job.postCount)}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <span className="text-[#8A8F98] block text-[10px] uppercase">Last Date</span>
              <span className="text-sm font-bold text-amber-400">{job.lastDate}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <span className="text-[#8A8F98] block text-[10px] uppercase">Exam Date</span>
              <span className="text-xs font-bold text-[#EDEDEF]">{job.examDateEstimated}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <span className="text-[#8A8F98] block text-[10px] uppercase">App Fee</span>
              <span className="text-xs font-bold text-emerald-400">{job.applicationFee}</span>
            </div>
          </div>

          {/* Detailed Criteria */}
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
              <span className="text-[#8b95ec] font-mono font-semibold block text-[10px] uppercase">
                Educational Qualification Requirement
              </span>
              <p className="text-[#EDEDEF] leading-relaxed">{job.eligibility}</p>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
              <span className="text-[#8b95ec] font-mono font-semibold block text-[10px] uppercase">
                Age Criteria & Relaxations
              </span>
              <p className="text-[#EDEDEF] leading-relaxed">{job.ageLimit}</p>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
              <span className="text-[#8b95ec] font-mono font-semibold block text-[10px] uppercase">
                Remuneration & Pay Scale
              </span>
              <p className="text-[#EDEDEF] leading-relaxed">{job.salaryRange}</p>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
              <span className="text-[#8b95ec] font-mono font-semibold block text-[10px] uppercase">
                Job Overview & Department Roles
              </span>
              <p className="text-[#8A8F98] leading-relaxed">{job.description}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
            <a
              href={job.officialNotificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#8b95ec] hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>Download Official Gazette Notification (PDF)</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-xs"
              >
                Close
              </Button>

              {isApplied ? (
                <Button
                  variant="secondary"
                  size="sm"
                  disabled
                  className="text-xs text-emerald-300 border-emerald-500/30"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Applied</span>
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    onClose();
                    onApply(job);
                  }}
                  className="text-xs"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Apply Online</span>
                </Button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
