import { COLOR_PALLETTE } from "src/constants/color";
import { MuiTableCellProps } from "src/types/MuiTable";
import { Button, Typography } from "@mui/material";
import { Link, LinkProps } from "react-router-dom";

export function LinkCell<T extends Record<string, any>>({
  ...rest
}: LinkProps) {
  return function Cell({ cell }: MuiTableCellProps<T>) {
    const value = cell?.getValue() as string;
    return (
      <Link {...rest} style={{ textDecoration: "none" }}>
        <Button>
          <Typography
            fontSize={"16px"}
            color={COLOR_PALLETTE.PRIMARY}
            sx={{
              textTransform: "none",
            }}
          >
            {value}
          </Typography>
        </Button>
      </Link>
    );
  };
}
