import { MuiTableCellProps } from "src/types/MuiTable";
import { Typography } from "@mui/material";

export function TextCell<T extends Record<string, any>>({
  cell,
}: MuiTableCellProps<T>) {
  const value = cell?.getValue() as string;

  return <Typography>{value}</Typography>;
}
