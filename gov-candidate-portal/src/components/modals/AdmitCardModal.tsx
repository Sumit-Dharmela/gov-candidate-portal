'use client';

import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  MapPin, 
  AlertTriangle,
  QrCode,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { AdmitCard, CandidateProfile } from '@/lib/types';

interface AdmitCardModalProps {
  card: AdmitCard | null;
  candidate: CandidateProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const AdmitCardModal: React.FC<AdmitCardModalProps> = ({
  card,
  candidate,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !card) return null;

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
        
        {/* Top Control Bar (Non-printable) */}
        <div className="no-print flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#050506]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#8b95ec]" />
            <span className="text-xs font-semibold text-white tracking-wide">
              Official e-Admit Card Preview
            </span>
            <Badge variant="success" className="text-[10px]">Verified Copy</Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handlePrint}
              className="text-xs"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / Download PDF</span>
            </Button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 text-[#8A8F98] hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Printable Official Government Admit Card Document */}
        <div className="admit-card-printable p-6 sm:p-8 space-y-6 bg-white/[0.02]">
          
          {/* Official Document Header */}
          <div className="text-center pb-4 border-b border-white/10 space-y-1">
            <div className="text-[11px] font-mono tracking-widest text-[#8A8F98] uppercase">
              GOVERNMENT OF INDIA • STAFF SELECTION COMMISSION
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
              e-Admit Card (Computer Based Examination)
            </h2>
            <div className="text-xs text-[#8b95ec] font-mono">
              {card.examName}
            </div>
          </div>

          {/* Barcode & Security Number */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-[#8A8F98]">Authentication Barcode:</span>
              <span className="tracking-widest font-bold text-white">||| | |||| ||| ||||| ||||</span>
              <span className="text-[#8b95ec]">[{card.barcode}]</span>
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>SSC Digital Signature Verified</span>
            </div>
          </div>

          {/* Candidate Info + Photo & Signature Box */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pb-4 border-b border-white/10">
            
            {/* Candidate Specs (3 Columns) */}
            <div className="sm:col-span-3 grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[#8A8F98] block text-[10px] uppercase">Roll Number</span>
                <span className="text-white font-bold text-sm sm:text-base">{card.rollNumber}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[#8A8F98] block text-[10px] uppercase">Registration ID</span>
                <span className="text-white font-bold text-sm sm:text-base">{card.registrationNumber}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[#8A8F98] block text-[10px] uppercase">Candidate Name</span>
                <span className="text-[#EDEDEF] font-semibold">{card.candidateName}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[#8A8F98] block text-[10px] uppercase">Category / Gender</span>
                <span className="text-[#EDEDEF] font-semibold">{card.category} / {card.gender}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[#8A8F98] block text-[10px] uppercase">Date of Birth</span>
                <span className="text-[#EDEDEF] font-semibold">{card.dob}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[#8A8F98] block text-[10px] uppercase">Post Applied</span>
                <span className="text-[#EDEDEF] font-semibold truncate block">{card.postName}</span>
              </div>
            </div>

            {/* Photo & Signature (1 Column) */}
            <div className="flex flex-col items-center justify-between gap-2 p-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02]">
              <div className="h-28 w-24 rounded-lg overflow-hidden border border-white/20 bg-black/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={candidate.photoUrl}
                  alt="Candidate Photo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-10 w-24 rounded border border-white/10 bg-white/[0.04] flex items-center justify-center p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={candidate.signatureUrl}
                  alt="Candidate Signature"
                  className="max-h-full max-w-full invert opacity-80"
                />
              </div>
              <span className="text-[9px] font-mono text-[#8A8F98]">Applicant Verification</span>
            </div>

          </div>

          {/* Exam Schedule & Venue Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-white/10 text-xs">
            
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <span className="text-[10px] font-mono text-[#8b95ec] uppercase font-semibold">
                Examination Schedule
              </span>
              <div className="space-y-1.5 font-mono">
                <div className="flex justify-between">
                  <span className="text-[#8A8F98]">Exam Date:</span>
                  <span className="text-white font-bold">{card.examDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A8F98]">Shift / Timings:</span>
                  <span className="text-white font-bold">{card.shift}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A8F98]">Reporting Time:</span>
                  <span className="text-emerald-400 font-bold">{card.reportingTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A8F98]">Gate Closing Time:</span>
                  <span className="text-red-400 font-bold">{card.gateClosingTime}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <span className="text-[10px] font-mono text-[#8b95ec] uppercase font-semibold">
                Examination Center Allotment
              </span>
              <div className="space-y-1">
                <div className="text-white font-semibold flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#8b95ec]" />
                  <span>{card.examCenterName}</span>
                </div>
                <p className="text-[#8A8F98] text-[11px] leading-relaxed">
                  {card.examCenterAddress}
                </p>
                <div className="text-[10px] font-mono text-[#8b95ec] pt-1">
                  Center Code: <strong className="text-white">{card.centerCode}</strong> • City: {card.examCity}
                </div>
              </div>
            </div>

          </div>

          {/* Instructions Checklist */}
          <div className="space-y-2 text-xs">
            <span className="text-[11px] font-mono text-amber-300 font-semibold uppercase flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
              General Instructions for Candidates
            </span>
            <ul className="space-y-1 text-[11px] text-[#8A8F98] list-disc list-inside leading-relaxed">
              {card.instructions.map((inst, i) => (
                <li key={i}>{inst}</li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
