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
export interface IRequirement {
  status: StageStatus;
  type: StageType;
  code: StageType;
  durationMinutes: number;
  submittedAt: Date;
  requestedAt: Date;
  seconds: number; // To be checked not to cause any issues
}
