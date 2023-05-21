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
  completedDate?: string;
  detailKey: string;
  handleClick: Function;
  index: string;
}

export interface IOneRelocationStage {
  status: string;
  submittedAt: string;
  completedAt?: string;
  type: string;
  code?: string;
  description?: string;
}
// Move to shared
export interface IProgressStep extends Stage {}
// Move to shared
export interface IProgressBars {
  activeStep: {
    [key: string]: IProgressRelocation;
  };
  userSteps: IStep[];
}
export interface IRelocationBEStage {
  completedAt?: string;
  createdAt: string;
  status: string;
  relocationStep: string;
  description?: string;
}
export interface IProgressRelocation extends IRelocationBEStage {}
export interface IRelocationMap {
  [key: string]: IRelocationBEStage;
}
export interface IFileUploadProgress {
  file?: File;
  uploadURL?: string;
}
export interface IUploadButton {
  onFileUpload: (file: File) => void;
}
export interface IFillOutButton {
  windowWidth?: 'sm' | 'lg' | 'xl';
  fileURL: string;
}
export interface IUploadedFile {
  fileName: string;
}
export interface IDocumentWrapper {
  children?: React.ReactNode;
}
export interface IRelocationDetails {
  name: string;
  documents: IDocument[];
}
export interface IDocument {
  name: string;
  description: string | null;
  uploadedFiles: IFileDocument[];
}

export interface IMapDocument {
  [key: string]: IRelocationBE;
}
export interface IFileDocument {
  documentId: string;
  fileExtension: string;
  mediaType: string;
  fileName: string;
}
export interface IMapRelocationDetails {
  name: string;
  documentTypes: IMapDocument;
}
export interface IRelocationBE {
  name: string;
  description: string | null;
  documents: IFileDocument[];
}
export interface ITemplate {
  [key: string]: IMapRelocationDetails;
}
