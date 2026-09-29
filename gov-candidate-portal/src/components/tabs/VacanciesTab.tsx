'use client';

import React, { useState } from 'react';
import { 
  Compass, 
  Search, 
  Filter, 
  Building2, 
  Users, 
  Banknote, 
  GraduationCap, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ExternalLink,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { JobVacancy, JobCategory, Application } from '@/lib/types';
import { formatNumber } from '@/lib/utils';

interface VacanciesTabProps {
  vacancies: JobVacancy[];
  applications: Application[];
  onApplyJob: (job: JobVacancy) => void;
  onViewJobDetails: (job: JobVacancy) => void;
}

export const VacanciesTab: React.FC<VacanciesTabProps> = ({
  vacancies,
  applications,
  onApplyJob,
  onViewJobDetails,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<JobCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: JobCategory; label: string }[] = [
    { id: 'ALL', label: 'All Sectors' },
    { id: 'SSC', label: 'SSC' },
    { id: 'UPSC', label: 'UPSC' },
    { id: 'BANKING', label: 'Banking & Insurance' },
    { id: 'RAILWAY', label: 'Indian Railways' },
    { id: 'DEFENCE', label: 'Defence & Police' },
    { id: 'STATE_PSC', label: 'State PSC' },
  ];

  const filteredVacancies = vacancies.filter((job) => {
    const matchesCategory = selectedCategory === 'ALL' || job.category === selectedCategory;
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.eligibility.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const isJobApplied = (jobId: string) => {
    return applications.some(app => app.jobId === jobId);
  };

  return (
    <div className="space-y-6">
      
      {/* Search & Category Filter Section */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8A8F98]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job title, ministry, qualification (10th/Graduate)..."
              className="w-full bg-[#0a0a0c] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#8A8F98] focus:outline-none focus:border-[#5E6AD2] focus:ring-1 focus:ring-[#5E6AD2]"
            />
          </div>

          <div className="text-xs text-[#8A8F98] font-mono flex items-center gap-2 self-end sm:self-center">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Tracking {vacancies.length} Active Drives</span>
          </div>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#5E6AD2]/20 text-white border border-[#5E6AD2]/40 shadow-[0_0_12px_rgba(94,106,210,0.15)]'
                  : 'text-[#8A8F98] hover:text-[#EDEDEF] hover:bg-white/[0.04]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Vacancy Cards Bento / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredVacancies.map((job) => {
          const applied = isJobApplied(job.id);

          return (
            <SpotlightCard key={job.id} className="p-6 flex flex-col justify-between">
              <div>
                
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#5E6AD2]/15 text-[#8b95ec] border border-[#5E6AD2]/25">
                        {job.category}
                      </span>
                      {job.isUrgent && (
                        <Badge variant="warning" dot pulse className="text-[10px]">
                          Closing Soon
                        </Badge>
                      )}
                      {job.isNew && (
                        <Badge variant="accent" className="text-[10px]">
                          New Notification
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight leading-snug">
                      {job.title}
                    </h3>
                    <p className="text-xs text-[#8A8F98] flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-[#8b95ec]" />
                      <span>{job.organization}</span>
                    </p>
                  </div>

                  <div className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-right flex-shrink-0">
                    <span className="text-[10px] text-[#8A8F98] font-mono uppercase block">Posts</span>
                    <span className="text-sm sm:text-base font-bold text-white font-mono">
                      {formatNumber(job.postCount)}
                    </span>
                  </div>
                </div>

                {/* Key Spec Grid */}
                <div className="grid grid-cols-2 gap-2.5 py-3 border-y border-white/[0.06] text-xs font-mono mb-3">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-[#8A8F98] uppercase">Pay Scale</span>
                    <span className="text-[#EDEDEF] block truncate font-medium">{job.salaryRange}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-[#8A8F98] uppercase">Age Limit</span>
                    <span className="text-[#EDEDEF] block font-medium">{job.ageLimit}</span>
                  </div>
                  <div className="space-y-0.5 col-span-2">
                    <span className="text-[10px] text-[#8A8F98] uppercase">Eligibility</span>
                    <span className="text-[#EDEDEF] block text-xs line-clamp-1">{job.eligibility}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#8A8F98] font-mono mb-4">
                  <span className="flex items-center gap-1.5 text-amber-300/90">
                    <Calendar className="h-3.5 w-3.5" />
                    Last Date: {job.lastDate}
                  </span>
                  <span>Fee: {job.applicationFee}</span>
                </div>

              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2">
                {applied ? (
                  <Button
                    variant="secondary"
                    size="md"
                    disabled
                    className="flex-1 text-xs border-emerald-500/30 text-emerald-300"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Already Applied (Tracking in Dashboard)</span>
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => onApplyJob(job)}
                    className="flex-1 text-xs"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Apply Now & Track</span>
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="md"
                  onClick={() => onViewJobDetails(job)}
                  className="text-xs px-3"
                  title="Official Details"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>
            </SpotlightCard>
          );
        })}
      </div>

      {filteredVacancies.length === 0 && (
        <SpotlightCard className="p-12 text-center">
          <AlertCircle className="h-8 w-8 text-[#8A8F98] mx-auto mb-3" />
          <p className="text-white font-medium text-sm">No vacancies match your filter</p>
          <p className="text-[#8A8F98] text-xs mt-1">Try switching categories or clearing search keywords.</p>
        </SpotlightCard>
      )}

    </div>
  );
};
