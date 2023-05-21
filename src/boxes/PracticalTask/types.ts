export interface IModalProps {
  show: boolean;
  handleClose: () => void;
  code: string;
}
export interface ILanguage {
  setLanguage: (args: string) => void;
  language: string;
}
