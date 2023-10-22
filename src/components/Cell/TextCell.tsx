import { MuiTableCellProps } from "src/types/MuiTable";
import { Typography, TypographyProps } from "@mui/material";

export function TextCell<T extends Record<string, any>>({
  ...rest
}: TypographyProps) {
  return function Cell({ cell }: MuiTableCellProps<T>) {
    const value = cell?.getValue() as string;
    return (
      <Typography fontSize={"16px"} {...rest}>
        {value}
      </Typography>
    );
  };
}
