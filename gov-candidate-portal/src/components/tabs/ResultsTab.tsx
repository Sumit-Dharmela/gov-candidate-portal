'use client';

import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  BarChart3, 
  FileText, 
  Sparkles, 
  Calendar, 
  ArrowUpRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ExamResult } from '@/lib/types';

interface ResultsTabProps {
  results: ExamResult[];
  onDownloadScorecard: (result: ExamResult) => void;
}

export const ResultsTab: React.FC<ResultsTabProps> = ({
  results,
  onDownloadScorecard,
}) => {
  return (
    <div className="space-y-6">
      
      {results.map((result) => {
        const marginOverCutoff = (result.normalizedScore - result.categoryCutoff).toFixed(2);

        return (
          <div key={result.id} className="space-y-5">
            
            {/* Main Result Hero Card */}
            <SpotlightCard className="p-6 md:p-8">
              
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="success" dot pulse className="text-xs">
                      OFFICIAL RESULT DECLARED
                    </Badge>
                    <span className="text-xs font-mono text-[#8A8F98]">Published: {result.publishedDate}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                    {result.examName}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#8A8F98] font-mono">
                    <span>Roll No: <strong className="text-white">{result.rollNumber}</strong></span>
                    <span>•</span>
                    <span>Stage: <strong className="text-[#8b95ec]">{result.tierStage}</strong></span>
                    <span>•</span>
                    <span>Category: <strong className="text-white">{result.category}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => onDownloadScorecard(result)}
                    className="text-xs"
                  >
                    <Award className="h-4 w-4" />
                    <span>Download Official Scorecard</span>
                  </Button>
                </div>
              </div>

              {/* Score Bento Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
                
                {/* Normalized Score */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-[#5E6AD2]/30 shadow-[0_0_20px_rgba(94,106,210,0.15)]">
                  <span className="text-[11px] font-mono text-[#8A8F98] uppercase block mb-1">
                    Normalized Score
                  </span>
                  <div className="text-3xl font-bold text-white tracking-tight">
                    {result.normalizedScore.toFixed(2)}
                  </div>
                  <span className="text-[10px] text-[#8b95ec] font-mono mt-1 block">
                    Raw Score: {result.rawScore.toFixed(2)} / 200
                  </span>
                </div>

                {/* Category Cutoff & Margin */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[11px] font-mono text-[#8A8F98] uppercase block mb-1">
                    Category Cutoff ({result.category})
                  </span>
                  <div className="text-3xl font-bold text-emerald-400 tracking-tight">
                    {result.categoryCutoff.toFixed(2)}
                  </div>
                  <span className="text-[10px] text-emerald-300 font-mono mt-1 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +{marginOverCutoff} above cutoff
                  </span>
                </div>

                {/* Percentile */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[11px] font-mono text-[#8A8F98] uppercase block mb-1">
                    Percentile Rank
                  </span>
                  <div className="text-3xl font-bold text-white tracking-tight">
                    {result.percentile}%
                  </div>
                  <span className="text-[10px] text-[#8A8F98] font-mono mt-1 block">
                    All-India Rank ~{result.rankEstimated}
                  </span>
                </div>

                {/* Qualification Status */}
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <span className="text-[11px] font-mono text-emerald-300 uppercase block mb-1">
                    Final Status
                  </span>
                  <div className="text-lg font-bold text-emerald-300 tracking-tight flex items-center gap-1.5 mt-1">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    <span>QUALIFIED</span>
                  </div>
                  <span className="text-[10px] text-emerald-300/80 font-mono mt-1 block">
                    Shortlisted for Tier-II
                  </span>
                </div>

              </div>

              {/* Remarks Banner */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-[#EDEDEF] flex items-center justify-between">
                <span>{result.remarks}</span>
                <span className="text-[11px] font-mono text-[#8b95ec]">List-1 & List-2 Clear</span>
              </div>

            </SpotlightCard>

            {/* Sectional Performance Breakdown */}
            <SpotlightCard className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight">
                    Sectional Scorecard & Accuracy
                  </h3>
                  <p className="text-xs text-[#8A8F98]">
                    Breakdown of questions attempted, negative deductions, and sectional marks.
                  </p>
                </div>
                <Badge variant="accent" className="font-mono text-xs">
                  Max Marks: 200
                </Badge>
              </div>

              <div className="space-y-4">
                {result.sections.map((sec, idx) => {
                  const percentage = Math.round((sec.obtainedMarks / sec.maxMarks) * 100);
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                        <div className="space-y-0.5">
                          <span className="text-xs font-semibold text-white">
                            {sec.sectionName}
                          </span>
                          <div className="text-[11px] text-[#8A8F98] font-mono flex items-center gap-3">
                            <span className="text-emerald-400">Correct: {sec.correctAnswers}</span>
                            <span className="text-red-400">Wrong: {sec.wrongAnswers}</span>
                            <span>Negative: -0.50/wrong</span>
                          </div>
                        </div>

                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold text-white font-mono">
                            {sec.obtainedMarks.toFixed(2)}
                          </span>
                          <span className="text-xs text-[#8A8F98] font-mono">
                            / {sec.maxMarks}
                          </span>
                          <Badge 
                            variant={percentage >= 75 ? "success" : percentage >= 50 ? "accent" : "warning"} 
                            className="text-[10px] ml-1"
                          >
                            {percentage}%
                          </Badge>
                        </div>
                      </div>

                      {/* Performance Bar */}
                      <div className="w-full bg-white/[0.06] h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#5E6AD2] to-[#8b95ec] rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Next Stage Roadmap */}
              <div className="mt-6 p-4 rounded-xl border border-white/[0.08] bg-gradient-to-r from-white/[0.03] to-transparent flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-medium text-white flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-[#8b95ec]" />
                    <span>Next Examination Stage: {result.nextStageTitle}</span>
                  </div>
                  <p className="text-[11px] text-[#8A8F98] font-mono">
                    Tentative Schedule: {result.nextStageDate}
                  </p>
                </div>
                <Button variant="secondary" size="sm" className="text-xs whitespace-nowrap">
                  <span>View Tier-II Syllabus</span>
                  <ExternalLink className="h-3.5 w-3.5 text-[#8b95ec]" />
                </Button>
              </div>

            </SpotlightCard>

          </div>
        );
      })}

    </div>
  );
};
