import React from 'react';

export interface IRadioButton {
  id: string;
  val: number;
  msg: string;
  title: string;
  name: string;
}

export type IModal = {
  show: boolean;
  handleClose: () => void;
  tips: string[];
  testType: string | undefined;
};

export interface LocationState {
  from: string;
}

export type IMarks = {
  id: string;
  val: number;
  isChecked: string;
  title: string;
  name: string;
  msg: string;
};

export interface IMarksArray {
  [key: string]: IMarks;
}

export interface IMarksModal {
  show: boolean;
  handleClose: () => void;
  evaluationMarks?: IMarks[];
}

export interface INotifications {
  errorMsg: string;
  show: boolean;
}

export interface IPromptModal {
  when: boolean;
  onOK: () => boolean;
  onCancel: () => boolean;
  title: string;
  okText: string;
  cancelText: string;
}

export interface IScrollToTop {
  children?: React.ReactNode;
}

export interface IToasts {
  errorMsg: string;
  title?: string;
  show: boolean;
  handleClose: () => void;
}

export interface IDropdownMenu {
  handleClose: () => void;
  handleOpen: () => void;
  open: boolean;
  currentUser: string;
}

export interface IOverlay {
  text: string;
  children: React.ReactNode;
}
