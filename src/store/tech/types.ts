export type TechState = {
  skillMatrixExists: boolean;
  matrixInProgress: boolean;
  techRequirements: any[];
  techRequirementStatus: string;
};

export type TechRequirement = {
  type: string;
  status: string;
  code?: string;
  durationMinutes: number;
  requestedAt: string;
  submittedAt?: string;
};
