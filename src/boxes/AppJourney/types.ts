import { Stage } from 'store/journey/types';

export type ProgressBarNames =
  | 'Application Review'
  | 'HR Interview'
  | 'Technical Interview'
  | 'Your Offer'
  | 'Final Stage';

export type StagesStatus =
  | 'ACTIVE'
  | 'Completed'
  | 'PASSED'
  | 'SKIPPED'
  | 'FAILED'
  | 'NOT_STARTED';

export type StageStatus =
  | 'IN_PROGRESS'
  | 'NOT_STARTED'
  | 'SUBMITTED'
  | 'Completed';

export type StageType =
  | 'STARTED'
  | 'HR'
  | 'TECHNICAL'
  | 'OFFER'
  | 'DONE'
  | 'PRACTICAL'
  | 'SKILLS';

export type MeetingType = 'ONLINE' | 'OFFLINE';

export interface IStep {
  name: string;
  type: string;
  status?: string;
}

export interface IRequirement {
  status: StageStatus;
  type: StageType;
  code: StageType;
  durationMinutes: number;
  submittedAt: Date;
  requestedAt: Date;
  seconds: number; // To be checked not to cause any issues
}

export interface ITable {
  status?: string;
  startDate?: string;
  applicationStep: string;
  step: string;
  detailKey: string;
  handleClick: Function;
  meeting?: string;
  meetingType?: string;
  officeLocation?: string;
  index: string;
}

export interface IMeetingDetails {
  type: MeetingType;
  officeLocation?: string;
  url?: string;
  roomName?: string;
  meetingId?: string;
  passCode?: string;
}

export interface IOneStage {
  code: StageType;
  meetingDetails?: IMeetingDetails;
  status: StagesStatus;
  submittedAt: string;
  type: string;
  dateTime?: string;
}

export interface IProgressStep extends Stage {}

export interface IProgressBar {
  activeStep: {
    [key: string]: IProgressStep;
  };
  userSteps: IStep[];
}
