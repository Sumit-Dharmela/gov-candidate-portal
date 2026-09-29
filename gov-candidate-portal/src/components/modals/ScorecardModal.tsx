'use client';

import React from 'react';
import { 
  X, 
  Printer, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  Calendar 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ExamResult, CandidateProfile } from '@/lib/types';

interface ScorecardModalProps {
  result: ExamResult | null;
  candidate: CandidateProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const ScorecardModal: React.FC<ScorecardModalProps> = ({
  result,
  candidate,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !result) return null;

  const handlePrint = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    setTimeout(() => {
      window.print();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 rounded-2xl border border-white/10 bg-[#0a0a0c] text-[#EDEDEF] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Control Bar */}
        <div className="no-print flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#050506]">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-[#8b95ec]" />
            <span className="text-xs font-semibold text-white tracking-wide">
              Official Candidate Scorecard
            </span>
            <Badge variant="success" className="text-[10px]">Verified Result</Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handlePrint}
              className="text-xs"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print Scorecard</span>
            </Button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 text-[#8A8F98] hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Printable Scorecard Document */}
        <div className="admit-card-printable p-6 sm:p-8 space-y-6 bg-white/[0.02]">
          
          <div className="text-center pb-4 border-b border-white/10 space-y-1">
            <div className="text-[11px] font-mono tracking-widest text-[#8A8F98] uppercase">
              STAFF SELECTION COMMISSION • CANDIDATE EVALUATION DOSSIER
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
              Official Marksheet & Tier-I Scorecard
            </h2>
            <div className="text-xs text-[#8b95ec] font-mono">
              {result.examName}
            </div>
          </div>

          {/* Candidate Profile Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono pb-4 border-b border-white/10">
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <span className="text-[#8A8F98] block text-[10px] uppercase">Candidate Name</span>
              <span className="text-white font-semibold">{candidate.name}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <span className="text-[#8A8F98] block text-[10px] uppercase">Roll Number</span>
              <span className="text-white font-bold">{result.rollNumber}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <span className="text-[#8A8F98] block text-[10px] uppercase">Category</span>
              <span className="text-white font-bold">{result.category}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <span className="text-[#8A8F98] block text-[10px] uppercase">Registration ID</span>
              <span className="text-white font-bold">{candidate.registrationId}</span>
            </div>
          </div>

          {/* Overall Marks & Cutoff */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-white/[0.03] border border-[#5E6AD2]/30">
            <div>
              <span className="text-[10px] font-mono text-[#8A8F98] uppercase block">Raw Score</span>
              <span className="text-2xl font-bold text-white font-mono">{result.rawScore.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#8b95ec] uppercase block">Normalized Score</span>
              <span className="text-2xl font-bold text-[#8b95ec] font-mono">{result.normalizedScore.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#8A8F98] uppercase block">{result.category} Cutoff</span>
              <span className="text-2xl font-bold text-emerald-400 font-mono">{result.categoryCutoff.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-300 uppercase block">Qualifying Status</span>
              <span className="text-base font-bold text-emerald-300 flex items-center gap-1 mt-1 font-mono">
                <CheckCircle2 className="h-4 w-4" /> QUALIFIED
              </span>
            </div>
          </div>

          {/* Sectional Breakdown Table */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold text-white uppercase block">
              Section-Wise Marks Obtained
            </span>
            <div className="border border-white/10 rounded-xl overflow-hidden text-xs font-mono">
              <table className="w-full text-left">
                <thead className="bg-white/[0.04] text-[#8A8F98] border-b border-white/10">
                  <tr>
                    <th className="p-3">Section Description</th>
                    <th className="p-3 text-center">Correct</th>
                    <th className="p-3 text-center">Wrong</th>
                    <th className="p-3 text-right">Max Marks</th>
                    <th className="p-3 text-right">Marks Scored</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {result.sections.map((sec, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02]">
                      <td className="p-3 text-white font-medium">{sec.sectionName}</td>
                      <td className="p-3 text-center text-emerald-400">{sec.correctAnswers}</td>
                      <td className="p-3 text-center text-red-400">{sec.wrongAnswers}</td>
                      <td className="p-3 text-right text-[#8A8F98]">{sec.maxMarks}</td>
                      <td className="p-3 text-right text-white font-bold">{sec.obtainedMarks.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="bg-white/[0.03] font-bold text-white">
                    <td className="p-3" colSpan={3}>Total Cumulative Score (Raw)</td>
                    <td className="p-3 text-right text-[#8A8F98]">200</td>
                    <td className="p-3 text-right text-[#8b95ec]">{result.rawScore.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Verification seal */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono text-[#8A8F98]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Digitally Authenticated by Controller of Examinations</span>
            </div>
            <span>Published on {result.publishedDate}</span>
          </div>

        </div>

      </div>
    </div>
  );
};
