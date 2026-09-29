export type JobCategory = 'ALL' | 'SSC' | 'UPSC' | 'BANKING' | 'RAILWAY' | 'DEFENCE' | 'STATE_PSC';

export type ApplicationStatus = 
  | 'SUBMITTED' 
  | 'SCRUTINY_PASSED' 
  | 'ADMIT_CARD_RELEASED' 
  | 'EXAM_COMPLETED' 
  | 'TIER_QUALIFIED' 
  | 'FINAL_SELECTION' 
  | 'REJECTED';

export interface JobVacancy {
  id: string;
  title: string;
  organization: string; // e.g. Staff Selection Commission, UPSC, SBI, RRB
  category: JobCategory;
  postCount: number;
  salaryRange: string;
  location: string;
  eligibility: string;
  ageLimit: string;
  advertisementNo: string;
  publishDate: string;
  lastDate: string;
  examDateEstimated: string;
  applicationFee: string;
  isUrgent?: boolean;
  isNew?: boolean;
  description: string;
  officialNotificationUrl: string;
}

export interface Application {
  id: string;
  jobId: string;
  examName: string;
  organization: string;
  registrationNumber: string;
  rollNumber: string;
  appliedDate: string;
  status: ApplicationStatus;
  statusText: string;
  postApplied: string;
  examCategory: JobCategory;
  admitCardId?: string;
  resultId?: string;
  timeline: {
    title: string;
    date: string;
    completed: boolean;
    current?: boolean;
    note?: string;
  }[];
}

export interface AdmitCard {
  id: string;
  applicationId: string;
  examName: string;
  postName: string;
  organization: string;
  candidateName: string;
  rollNumber: string;
  registrationNumber: string;
  category: string; // e.g. EWS / OBC / UR
  dob: string;
  gender: string;
  examDate: string;
  shift: string; // e.g. "Shift 1 (09:00 AM - 10:00 AM)"
  reportingTime: string;
  gateClosingTime: string;
  examCity: string;
  examCenterName: string;
  examCenterAddress: string;
  centerCode: string;
  instructions: string[];
  barcode: string;
  downloadAvailable: boolean;
}

export interface SectionScore {
  sectionName: string;
  maxMarks: number;
  obtainedMarks: number;
  correctAnswers: number;
  wrongAnswers: number;
}

export interface ExamResult {
  id: string;
  applicationId: string;
  examName: string;
  tierStage: string; // e.g. "Tier-I (Computer Based Examination)"
  rollNumber: string;
  candidateName: string;
  category: string;
  rawScore: number;
  normalizedScore: number;
  categoryCutoff: number;
  overallCutoff: number;
  qualified: boolean;
  percentile: number;
  rankEstimated: number;
  sections: SectionScore[];
  publishedDate: string;
  nextStageTitle: string;
  nextStageDate: string;
  remarks: string;
}

export interface CandidateProfile {
  name: string;
  registrationId: string;
  rollNumber: string;
  email: string;
  phone: string;
  category: string;
  dob: string;
  aadhaarVerified: boolean;
  photoUrl: string;
  signatureUrl: string;
  state: string;
  educationLevel: string;
}

export interface LiveAlert {
  id: string;
  title: string;
  category: JobCategory;
  timestamp: string;
  tag: 'NEW' | 'URGENT' | 'ADMIT_CARD' | 'RESULT' | 'ANSWER_KEY';
  linkText?: string;
  actionType?: 'admit_card' | 'result' | 'vacancy';
  targetId?: string;
}
