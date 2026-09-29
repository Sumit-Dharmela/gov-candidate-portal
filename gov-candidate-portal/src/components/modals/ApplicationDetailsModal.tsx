'use client';

import React from 'react';
import { 
  X, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Printer, 
  Award, 
  ShieldCheck,
  Building2
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Application, AdmitCard, ExamResult } from '@/lib/types';

interface ApplicationDetailsModalProps {
  application: Application | null;
  admitCards: AdmitCard[];
  results: ExamResult[];
  isOpen: boolean;
  onClose: () => void;
  onViewAdmitCard: (card: AdmitCard) => void;
  onViewResult: (result: ExamResult) => void;
}

export const ApplicationDetailsModal: React.FC<ApplicationDetailsModalProps> = ({
  application,
  admitCards,
  results,
  isOpen,
  onClose,
  onViewAdmitCard,
  onViewResult,
}) => {
  if (!isOpen || !application) return null;

  const appAdmitCard = admitCards.find(ac => ac.applicationId === application.id);
  const appResult = results.find(r => r.applicationId === application.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 rounded-2xl border border-white/10 bg-[#0a0a0c] text-[#EDEDEF] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#050506]">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-[#8b95ec]" />
            <h3 className="text-sm font-semibold text-white">
              Application Dossier Details
            </h3>
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
          
          {/* Main Info */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#5E6AD2]/15 text-[#8b95ec] border border-[#5E6AD2]/25">
                {application.examCategory}
              </span>
              <span className="text-xs text-[#8A8F98] font-mono">
                Applied on: {application.appliedDate}
              </span>
            </div>
            <h4 className="text-lg font-semibold text-white">
              {application.examName}
            </h4>
            <div className="text-xs text-[#8A8F98] flex items-center gap-1.5 font-mono">
              <Building2 className="h-3.5 w-3.5 text-[#8b95ec]" />
              <span>{application.organization}</span>
            </div>
          </div>

          {/* Registration Specs */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <span className="text-[#8A8F98] block text-[10px] uppercase">Registration Number</span>
              <span className="text-white font-bold">{application.registrationNumber}</span>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <span className="text-[#8A8F98] block text-[10px] uppercase">Roll Number</span>
              <span className="text-white font-bold">{application.rollNumber}</span>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <span className="text-[#8A8F98] block text-[10px] uppercase">Post Applied</span>
              <span className="text-[#EDEDEF]">{application.postApplied}</span>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <span className="text-[#8A8F98] block text-[10px] uppercase">Current Status</span>
              <span className="text-emerald-400 font-medium">{application.statusText}</span>
            </div>
          </div>

          {/* Timeline details */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-white block">
              Recruitment Process Trail
            </span>
            <div className="space-y-2">
              {application.timeline.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs font-mono"
                >
                  <div className="flex items-center gap-2.5">
                    {step.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    ) : step.current ? (
                      <Clock className="h-4 w-4 text-[#8b95ec] animate-pulse" />
                    ) : (
                      <div className="h-2.5 w-2.5 rounded-full bg-white/20 ml-0.5 mr-1" />
                    )}
                    <span className={step.completed ? "text-white" : "text-[#8A8F98]"}>
                      {step.title}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#8A8F98] text-[11px]">{step.date}</span>
                    {step.note && (
                      <div className="text-[10px] text-[#8b95ec] font-semibold">{step.note}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connected Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.06]">
            {appAdmitCard && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  onClose();
                  onViewAdmitCard(appAdmitCard);
                }}
                className="text-xs"
              >
                <Award className="h-3.5 w-3.5" />
                <span>View Admit Card</span>
              </Button>
            )}

            {appResult && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  onClose();
                  onViewResult(appResult);
                }}
                className="text-xs"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>View Scorecard</span>
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs"
            >
              Close
            </Button>
          </div>

        </div>

      </div>
    </div>
  );
};
