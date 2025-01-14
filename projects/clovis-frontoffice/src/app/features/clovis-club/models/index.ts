export interface Modal {
  id: number;
  chip: string;
  modalName: string;
  title: string;
  content: string;
  description: string;
  button: Button;
}

export type Modals = Modal[];

export interface Button {
  id: string;
  title: string;
  detail: string;
}

export type Buttons = Button[];

export interface ModalsButtons {
  modals: Modals;
  buttons: Buttons;
}
