export type JourneyState = {
  stages: StageMap;
  stagesStatus: JourneyStatus;
  benefits: Benefits[];
  benefitsStatus: JourneyStatus;
  interviewer: Interviewer;
  interviewerStatus: JourneyStatus;
  stageDetails: StageDetails;
  stageDetailStatus: JourneyStatus;
  currentStage: string;
};
export type JourneyStatus = 'idle' | 'loading' | 'rejected' | 'success';

export type Stage = {
  type: string;
  status: string;
  requestedAt: string;
  durationMinutes?: number;
  submittedAt?: string;
  dateTime?: string;
  meetingDetails?: MeetingDetails;
};

export type StageMap = {
  [key: string]: Stage;
};

export type Benefits = {
  name: string;
  description: string;
  order: number;
};

export type Interviewer = {
  name: string;
  email: string;
  photoURL?: string;
  linkedinURL?: string;
};

export type StageDetails = {
  userId: string;
  type: string;
  status: string;
  dateTime: string;
  meetingDetails: MeetingDetails;
  interviewerDetails?: Interviewer;
  benefits?: Benefits[];
  salaryDetails: SalaryDetails;
};

export type MeetingDetails = {
  type: string;
  officeLocation?: string;
  roomName?: string;
  url?: string;
  meetingId?: string;
  passCode?: string;
};

export type SalaryDetails = {
  salary: string;
  probationSalary: string;
  probationMonths: number;
  conditional: boolean;
  currency: string;
};

export type Empty = {};
