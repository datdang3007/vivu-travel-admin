import { MuiTableCellProps } from "src/types/MuiTable";
import { Box, Typography, TypographyProps, styled } from "@mui/material";
import { useMemo } from "react";
import { PostStatus } from "src/constants/post_status";
import { COLOR_PALLETTE } from "src/constants/color";

export function StatusCell<T extends Record<string, any>>({
  ...rest
}: TypographyProps) {
  return function Cell({ cell }: MuiTableCellProps<T>) {
    const value = cell?.getValue() as string;

    const boxProps = useMemo(() => {
      switch (Number(value)) {
        case PostStatus.New: {
          return {
            label: "Chờ phê duyệt",
            sx: {
              background: COLOR_PALLETTE.WARNING,
            },
          };
        }
        case PostStatus.Approved: {
          return {
            label: "Đã phê duyệt",
            sx: {
              background: COLOR_PALLETTE.SUCCESS,
            },
          };
        }
        case PostStatus.Rejected: {
          return {
            label: "Bị từ chối",
            sx: {
              background: COLOR_PALLETTE.ERROR,
            },
          };
        }
        default: {
          return {
            label: "",
            sx: {},
          };
        }
      }
    }, [value]);

    return (
      <BoxStatus sx={boxProps.sx}>
        <Typography fontSize={"14px"} {...rest}>
          {boxProps.label}
        </Typography>
      </BoxStatus>
    );
  };
}

const BoxStatus = styled(Box)({
  borderRadius: "4px",
  width: "fit-content",
  padding: "4px 12px",
  color: COLOR_PALLETTE.WHITE,
});
