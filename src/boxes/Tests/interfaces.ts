export enum TestType {
  COGNITIVE = 'COGNITIVE',
  ADMISSION = 'ADMISSION',
  LANGUAGE = 'LANGUAGE',
}

export interface Instructions {
  text: string;
  tips: string[];
}

export interface Note {
  text: string;
  image: string;
}

export interface Specifics {
  name: string;
  duration: number;
  questions: string;
  instructions: Instructions;
  notes: Note[];
}

export interface InfoCardProps {
  notes: Note[];
}

export interface TestDTO {
  code: string;
  status: string;
  title: string;
  type: TestType;
  durationMinutes?: number;
  questions: string[];
  requestedAt: string;
  modifiedAt?: string;
  submittedAt: string;
  deprecatedAt?: string;
  deprecationReason?: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  testId?: any;
}

export interface Question {
  title: string;
  description: string;
  imageUrl?: string;
  type: string;
  answerType: string;
  tag: string | null;
  id: string;
  correctAnswersCount: number;
  answers: any[];
}

export interface SelectQuestionProps {
  question: Question;
  currentVal: any;
  setCurrentVal: any;
  clicked: string[];
  setClicked: any;
  count: number;
}

export interface TestProps {
  code: string;
  title: string;
  type: string;
  durationMinutes: number;
  questions: [];
}

export interface QuestionInfo {
  questionId: string;
  testCode: string;
  answers: Answers;
  username: string;
  answerIndexes?: number;
}

export interface IModal {
  show: boolean;
  handleClose: () => void;
}

export interface Answers {
  answers: string[];
}

type ScoreDetails = {
  count: number;
  score: number;
  percentage: number;
};

export type Score = {
  DEFAULT?: ScoreDetails;
  RDB?: ScoreDetails;
  OOP?: ScoreDetails;
  CODING?: ScoreDetails;
  QA?: ScoreDetails;
  NETWORK?: ScoreDetails;
  TECHNICAL?: ScoreDetails;
  VCS?: ScoreDetails;
  ARCHITECTURE?: ScoreDetails;
  DUMMY?: ScoreDetails;
};

export interface ISubmittedAnswer {
  title: string;
  description?: string;
  imageUrl?: string;
  type: string;
  tag?: string;
  answers: [];
  correctAnswers: [];
  userAnswers?: [];
  score: number;
  answerType: string;
  id?: string;
}

export interface ITestResult {
  testCode: string;
  status: string;
  answers: [];
  score: Score;
  startedAt: Date;
  submittedAt: Date;
  finishedSeconds: number;
}

export type QuestionsSection = {
  code: string;
  durationMinutes: number;
  questions: string[];
  title: string;
  type: string;
};

export interface IProgressSection {
  questions: QuestionsSection;
  count: number;
  setCount: any;
  clearCurrentVal: any;
}
