import {
  MRT_Cell,
  MRT_Column,
  MRT_Row,
  MRT_TableInstance,
} from "material-react-table";
import { ReactNode } from "react";

export interface MuiTableCellProps<T extends Record<string, any>> {
  cell: MRT_Cell<T>;
  renderedCellValue: number | string | ReactNode;
  column: MRT_Column<T>;
  row: MRT_Row<T>;
  table: MRT_TableInstance<T>;
}
