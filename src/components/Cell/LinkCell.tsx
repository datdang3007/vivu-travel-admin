import { COLOR_PALLETTE } from "src/constants/color";
import { MuiTableCellProps } from "src/types/MuiTable";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useMemo } from "react";

type Props = {
  link: string;
  isNewPage: boolean;
};

export function LinkCell<T extends Record<string, any>>({
  link,
  isNewPage,
}: Props) {
  return function Cell({ cell, row }: MuiTableCellProps<T>) {
    const value = cell?.getValue() as string;
    const rowOriginal = row.original;

    const toLink = useMemo(() => {
      const id = rowOriginal.id;
      return `${link}/${id}`;
    }, [rowOriginal]);

    return (
      <Link
        to={toLink}
        target={isNewPage ? "_blank" : ""}
        style={{ textDecoration: "none" }}
      >
        <Button>
          <Typography
            fontSize={"16px"}
            color={COLOR_PALLETTE.PRIMARY}
            sx={{
              textTransform: "none",
            }}
          >
            {value} ảnh
          </Typography>
        </Button>
      </Link>
    );
  };
}
