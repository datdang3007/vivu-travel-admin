import { ReactNode } from "react";

export interface ActionProps {
  id?: string;
  icon: ReactNode;
  title: string;
  role?: number[];
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
  link: string;
  active: boolean;
}

export interface ContentDataProps {
  id: string | number;
  type: number;
  content: string;
}

export interface PlaceImageStockProps {
  id: string | number;
  link: string;
}
