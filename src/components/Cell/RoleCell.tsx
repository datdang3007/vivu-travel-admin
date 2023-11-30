import { MuiTableCellProps } from "src/types/MuiTable";
import { Typography, TypographyProps } from "@mui/material";
import { useCallback } from "react";
import { Role } from "src/constants/role";

interface UserComponentProps {
  sx?: TypographyProps;
  text: string;
}

export function RoleCell<T extends Record<string, any>>({
  ...rest
}: TypographyProps) {
  return function Cell({ cell }: MuiTableCellProps<T>) {
    const value = cell?.getValue() as string;

    const RoleText = useCallback(() => {
      let user: UserComponentProps = { text: "" };
      switch (Number(value)) {
        case Role.User: {
          user.sx = { color: "#61A3BA" };
          user.text = "Người dùng cơ bản";
          break;
        }
        case Role.Teller: {
          user.sx = { color: "#79AC78" };
          user.text = "Người viết bài";
          break;
        }
      }

      return (
        <Typography fontSize={"16px"} sx={user.sx} {...rest}>
          {user.text}
        </Typography>
      );
    }, [value]);

    return RoleText();
  };
}
