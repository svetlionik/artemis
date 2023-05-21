import { Skill } from 'dexie/models/Skill';

export interface ISkill {
  id: string;
  name: string;
  description: string;
  mdsId: number;
  type: string;
}

export interface IPossibleYear {
  description: string;
  displayValue: string;
}

export interface ISkillGroup {
  createdAt: Date;
  modifiedAt: Date;
  name: string;
  order: number;
  profile: string;
  skills: ISkill[];
  skippable: boolean;
  possibleYears: IPossibleYear[];
}

export interface ISubmittedSkill {
  years: string;
  level: string;
  name: string;
  mdsId: number;
  type: string;
}

export interface IFormProps {
  skills: {
    skills: ISkill[];
    name: string;
    level: string;
    years: string;
  };
  profile?: string;
  order?: number;
  skippable?: boolean;
  name?: string;
  index: number;
  possibleYears: IPossibleYear[];
}

export interface ISubmittedSkillGroup {
  [key: string]: ISubmittedSkill[];
}

export interface RadioButtonProps {
  id: string;
  val: number;
  name: string;
  title: string;
  msg: string;
}

export interface IProgressSkillGroup {
  name: string;
  order: number;
  count: number;
  completed: boolean;
}

export interface ISkillSubmitted {
  years: string;
  level: string;
  name: string;
  mdsId: number;
  type: string;
}

export interface IArraySkillSubmitted {
  [key: string]: ISkillSubmitted[];
}
export interface IFieldsToMap {
  order: number;
  skills: {
    name: string;
    skills: ISkillSubmitted[];
  }[];
  name: string;
}

export interface ISectionSkills {
  name: string;
  skills: ISkillSubmitted[];
  order: number;
}

export interface ICategories {
  name: string;
  skills: {
    name: string;
    skills: ISectionSkills[];
  };
}

export interface ISkillMatrixInfo {
  setIsCompleted: (args: boolean) => void;
}

export interface IAdditionalSubbmitedSkill {
  level: string;
  type: string;
  years: string;
  name: string;
  importantFlag: boolean;
}

export interface IAdditionalSavedSkill {
  key: string;
  level?: number | undefined;
  years?: string | undefined;
  username?: string | undefined;
  isAdditional: boolean;
}

export interface IProgressSkillGroup {
  name: string;
  order: number;
  count: number;
  completed: boolean;
}

export interface ISavedSkill {
  [key: string]: Skill;
}

export interface IUpdateSavedSkill {
  (savedSkill: Skill, key: string): void;
}

export interface ISkillGroupProps {
  group: ISkillGroup;
  index: number;
  savedSkills?: ISavedSkill;
  updateProgressSkillGroups: (keys: string[]) => void;
}

export interface ISkillGroupItemProps {
  groupName: string;
  skill: ISkill;
  savedSkills?: ISavedSkill;
  possibleYears: IPossibleYear[];
  updateProgressSkillGroups: (keys: string[]) => void;
}

export interface ICustomRadioProps {
  savedSkills?: ISavedSkill;
  skill: ISkill;
  possibleYears?: IPossibleYear[];
  updateSavedSkill?: IUpdateSavedSkill;
  updateProgressSkillGroups: (keys: string[]) => void;
}

export interface ISkillsPostRequestBody {
  skills: ISkillsPostRequestBodySkills;
  additionalSkills: ISkillsPostRequestBodyAdditionalSkill[];
}

export interface ISkillsPostRequestBodySkills {
  [id: string]: { level: number; years: string };
}

export interface ISkillsPostRequestBodyAdditionalSkill {
  name: string;
  level: number;
  years: string;
}

export interface IAdditionalSectionProps {
  sectionLength: number;
  savedSkills?: Skill[];
  possibleYears?: IPossibleYear[];
}
