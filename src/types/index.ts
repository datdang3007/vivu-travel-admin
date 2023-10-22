import { ReactNode } from "react";

export interface ActionProps {
  id?: string;
  icon: ReactNode;
  title: string;
  onClick: () => void;
}

export interface FormTitleSearchProps {
  formTitleSearchValue: string;
  type?: string;
}

export interface FormTitleCheckBoxProps {
  formTitleCheckBoxValue: boolean;
}

export interface ListActionItemProps {
  title: string;
  actionList: ActionProps[];
}

export interface ListActionProps {
  list: ListActionItemProps[];
  clickLogout: () => void;
}

export interface ItemImageListProps {
  id: string | number;
  url: string;
  active: boolean;
}
