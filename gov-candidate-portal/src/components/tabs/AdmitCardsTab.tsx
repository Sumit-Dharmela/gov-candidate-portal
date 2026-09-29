'use client';

import React from 'react';
import { 
  Award, 
  Calendar, 
  Clock, 
  MapPin, 
  Download, 
  Printer, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2,
  ExternalLink,
  Barcode
} from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { AdmitCard } from '@/lib/types';

interface AdmitCardsTabProps {
  admitCards: AdmitCard[];
  onViewAdmitCard: (card: AdmitCard) => void;
}

export const AdmitCardsTab: React.FC<AdmitCardsTabProps> = ({
  admitCards,
  onViewAdmitCard,
}) => {
  return (
    <div className="space-y-6">
      
      {/* Notice Banner */}
      <div className="p-4 rounded-2xl border border-[#5E6AD2]/30 bg-gradient-to-r from-[#5E6AD2]/10 via-[#5E6AD2]/5 to-transparent flex items-start gap-3.5">
        <ShieldCheck className="h-5 w-5 text-[#8b95ec] flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="text-sm font-semibold text-white">
            Staff Selection Commission e-Admit Card Authentication Desk
          </div>
          <p className="text-xs text-[#8A8F98] leading-relaxed">
            Please verify all details like Roll Number, Examination Center, and Timing. Print two colored copies of your e-Admit card along with valid Photo Identity Proof (Aadhaar/Voter ID) for entry.
          </p>
        </div>
      </div>

      {/* Admit Cards List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {admitCards.map((card) => {
          const isUpcoming = card.id === 'AC-SSC-CHSL-TIER1';

          return (
            <SpotlightCard key={card.id} className="p-6 flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={isUpcoming ? "success" : "default"} dot pulse={isUpcoming}>
                        {isUpcoming ? "Active for Download" : "Archived Record"}
                      </Badge>
                      <span className="text-[10px] font-mono text-[#8A8F98]">{card.centerCode}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white tracking-tight leading-snug">
                      {card.examName}
                    </h3>
                    <p className="text-xs text-[#8b95ec] font-mono mt-0.5">
                      {card.postName}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] flex-shrink-0">
                    <Award className="h-5 w-5 text-[#8b95ec]" />
                  </div>
                </div>

                {/* Candidate & Center Specs */}
                <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/[0.06] text-xs font-mono mb-4">
                  <div className="space-y-1">
                    <span className="text-[#8A8F98] block text-[10px] uppercase">Roll Number</span>
                    <span className="text-white font-semibold text-sm">{card.rollNumber}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[#8A8F98] block text-[10px] uppercase">Category</span>
                    <span className="text-white font-semibold text-sm">{card.category}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[#8A8F98] block text-[10px] uppercase">Exam Date</span>
                    <span className="text-white font-semibold flex items-center gap-1.5">
                      <Calendar className="h-3 w-3 text-[#8b95ec]" />
                      {card.examDate}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[#8A8F98] block text-[10px] uppercase">Shift Timing</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      {card.shift.split('(')[0]}
                    </span>
                  </div>
                </div>

                {/* Venue Details */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-1.5 mb-5">
                  <div className="flex items-center gap-1.5 text-xs text-[#EDEDEF] font-medium">
                    <MapPin className="h-3.5 w-3.5 text-[#8b95ec]" />
                    <span>{card.examCenterName}</span>
                  </div>
                  <p className="text-[11px] text-[#8A8F98] pl-5 leading-relaxed">
                    {card.examCenterAddress}
                  </p>
                  <div className="flex items-center gap-4 text-[10px] font-mono text-amber-300/90 pl-5 pt-1">
                    <span>Reporting: {card.reportingTime}</span>
                    <span>•</span>
                    <span className="text-red-400">Gate Closes: {card.gateClosingTime}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => onViewAdmitCard(card)}
                  className="flex-1 text-xs"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>View & Print Admit Card</span>
                </Button>
              </div>
            </SpotlightCard>
          );
        })}
      </div>

      {/* Mandatory Exam Day Guidelines Checklist */}
      <SpotlightCard className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-white">Important Examination Day Protocols</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#8A8F98]">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>Carry 2 recent passport-size colour photos and original Aadhaar / PAN card.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>Entry gate strictly closes 30 minutes before the scheduled exam start.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>Electronic items, metallic ornaments, bags, and Bluetooth devices are forbidden.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>Rough paper and ballpoint pens are provided inside the computer lab.</span>
          </div>
        </div>
      </SpotlightCard>

    </div>
  );
};
