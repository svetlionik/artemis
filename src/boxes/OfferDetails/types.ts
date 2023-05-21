export interface ISalary {
  condition?: boolean;
  currency: string;
  probationMonths: number;
  probationSalary: string;
  salary: string;
}

export interface IBenefit {
  name: string;
  description: string;
  country?: string;
}

export interface IBenefits {
  benefits: IBenefit[];
}

export interface IInternalOpportunity {
  title: string;
  description: string;
  additional?: string[];
}

export interface IOpportunity {
  [key: string]: {
    opportunities?: IInternalOpportunity[];
  };
}
