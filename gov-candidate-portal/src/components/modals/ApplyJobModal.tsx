'use client';

import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  Calendar, 
  ShieldCheck, 
  UserCheck, 
  MapPin, 
  Banknote,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { JobVacancy, CandidateProfile, Application } from '@/lib/types';

interface ApplyJobModalProps {
  job: JobVacancy | null;
  candidate: CandidateProfile;
  isOpen: boolean;
  onClose: () => void;
  onSubmitApplication: (newApp: Application) => void;
}

export const ApplyJobModal: React.FC<ApplyJobModalProps> = ({
  job,
  candidate,
  isOpen,
  onClose,
  onSubmitApplication,
}) => {
  const [examCenter1, setExamCenter1] = useState('Delhi-NCR (Code: 2201)');
  const [examCenter2, setExamCenter2] = useState('Noida / Meerut (Code: 2202)');
  const [examCenter3, setExamCenter3] = useState('Jaipur / Dehradun (Code: 2203)');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Generate a new application record
      const generatedReg = `${job.category}-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const newApplication: Application = {
        id: `APP-${job.id}-${Date.now().toString().slice(-4)}`,
        jobId: job.id,
        examName: job.title,
        organization: job.organization,
        registrationNumber: generatedReg,
        rollNumber: `2201${Math.floor(100000 + Math.random() * 900000)}`,
        appliedDate: new Date().toISOString().split('T')[0],
        status: 'SUBMITTED',
        statusText: 'Application Successfully Submitted & Under Scrutiny',
        postApplied: job.title.split('(')[0].trim(),
        examCategory: job.category,
        timeline: [
          { title: "Application Form Submitted", date: "Today", completed: true, current: true, note: `Fee: ${job.applicationFee}` },
          { title: "Scrutiny & Document Verification", date: "Within 7-10 Days", completed: false },
          { title: "City Intimation & Admit Card", date: "TBA", completed: false },
          { title: "Computer Based Examination", date: job.examDateEstimated, completed: false },
          { title: "Answer Key & Result", date: "TBA", completed: false },
        ]
      };

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });

      setIsSubmitting(false);
      onSubmitApplication(newApplication);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 rounded-2xl border border-white/10 bg-[#0a0a0c] text-[#EDEDEF] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#050506]">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#8b95ec]" />
            <h3 className="text-sm font-semibold text-white">
              Official Application Submission Window
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg border border-white/10 hover:bg-white/10 text-[#8A8F98] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content & Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Vacancy Target Details */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-[#5E6AD2]/30 space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="accent" className="font-mono text-[10px]">
                {job.category}
              </Badge>
              <span className="text-xs text-[#8A8F98] font-mono">Advt: {job.advertisementNo}</span>
            </div>
            <h4 className="text-base font-semibold text-white tracking-tight">
              {job.title}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#8A8F98] pt-1">
              <span>Pay: <strong className="text-white">{job.salaryRange.split('(')[0]}</strong></span>
              <span>Posts: <strong className="text-white">{job.postCount}</strong></span>
              <span>Last Date: <strong className="text-amber-400">{job.lastDate}</strong></span>
              <span>Fee: <strong className="text-emerald-400">{job.applicationFee}</strong></span>
            </div>
          </div>

          {/* Pre-filled Candidate Credentials */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
              <UserCheck className="h-3.5 w-3.5 text-[#8b95ec]" />
              Candidate Verified Profile (Auto-Populated)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs font-mono">
              <div>
                <span className="text-[#8A8F98] block text-[10px]">NAME</span>
                <span className="text-white font-medium">{candidate.name}</span>
              </div>
              <div>
                <span className="text-[#8A8F98] block text-[10px]">REGISTRATION ID</span>
                <span className="text-white font-medium">{candidate.registrationId}</span>
              </div>
              <div>
                <span className="text-[#8A8F98] block text-[10px]">CATEGORY</span>
                <span className="text-emerald-400 font-medium">{candidate.category}</span>
              </div>
              <div>
                <span className="text-[#8A8F98] block text-[10px]">DATE OF BIRTH</span>
                <span className="text-white font-medium">{candidate.dob}</span>
              </div>
              <div>
                <span className="text-[#8A8F98] block text-[10px]">DOMICILE STATE</span>
                <span className="text-white font-medium">{candidate.state}</span>
              </div>
              <div>
                <span className="text-[#8A8F98] block text-[10px]">AADHAAR STATUS</span>
                <span className="text-emerald-400 font-medium">Verified ✓</span>
              </div>
            </div>
          </div>

          {/* Exam Center Preferences */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#8b95ec]" />
              Examination City Center Preferences
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] text-[#8A8F98] font-mono">CHOICE 1 (PRIMARY)</label>
                <select
                  value={examCenter1}
                  onChange={(e) => setExamCenter1(e.target.value)}
                  className="w-full bg-[#050506] border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#5E6AD2]"
                >
                  <option value="Delhi-NCR (Code: 2201)">Delhi-NCR (2201)</option>
                  <option value="Chandigarh / Mohali (Code: 1601)">Chandigarh (1601)</option>
                  <option value="Lucknow (Code: 2101)">Lucknow (2101)</option>
                  <option value="Jaipur (Code: 2401)">Jaipur (2401)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-[#8A8F98] font-mono">CHOICE 2</label>
                <select
                  value={examCenter2}
                  onChange={(e) => setExamCenter2(e.target.value)}
                  className="w-full bg-[#050506] border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#5E6AD2]"
                >
                  <option value="Noida / Meerut (Code: 2202)">Noida / Meerut (2202)</option>
                  <option value="Dehradun (Code: 2402)">Dehradun (2402)</option>
                  <option value="Agra (Code: 2102)">Agra (2102)</option>
                  <option value="Kanpur (Code: 2103)">Kanpur (2103)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-[#8A8F98] font-mono">CHOICE 3</label>
                <select
                  value={examCenter3}
                  onChange={(e) => setExamCenter3(e.target.value)}
                  className="w-full bg-[#050506] border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#5E6AD2]"
                >
                  <option value="Jaipur / Dehradun (Code: 2203)">Jaipur / Ajmer (2203)</option>
                  <option value="Prayagraj / Allahabad (Code: 2104)">Prayagraj (2104)</option>
                  <option value="Bhopal (Code: 2501)">Bhopal (2501)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Candidate Declaration Checkbox */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
            <input
              type="checkbox"
              id="declaration"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-white/20 text-[#5E6AD2] focus:ring-[#5E6AD2]"
            />
            <label htmlFor="declaration" className="text-xs text-[#8A8F98] leading-relaxed cursor-pointer select-none">
              I hereby declare that all statements made in this application are true and complete. I fulfill all educational qualifications and age limits prescribed in the official notification.
            </label>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={onClose}
              className="text-xs"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              disabled={!agreeTerms}
              className="text-xs"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Confirm & Submit Application</span>
            </Button>
          </div>

        </form>

      </div>
    </div>
  );
};
