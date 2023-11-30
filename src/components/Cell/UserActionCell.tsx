import { AccountBox, ContactMail, GppBad } from "@mui/icons-material";
import { Grid, IconButton, SxProps, Tooltip } from "@mui/material";
import { ReactNode, useCallback, useMemo } from "react";
import { Role } from "src/constants/role";
import { MuiTableCellProps } from "src/types/MuiTable";

type Props = {
  onChangeRole?: (id: string) => void;
  onBlock?: (id: string) => void;
};

interface ChangeRoleProps {
  icon?: ReactNode;
  sx?: SxProps;
  text: string;
}

export function UserActionCell<T extends Record<string, any>>({
  onChangeRole,
  onBlock,
}: Props) {
  return function Cell({ row }: MuiTableCellProps<T>) {
    const id = row.original.id;
    const role = row.original.role.id;

    const props = useMemo(() => {
      let result: ChangeRoleProps = { text: "" };
      switch (Number(role)) {
        case Role.User: {
          result.icon = <AccountBox />;
          result.sx = { color: "#61A3BA" };
          result.text = "Sửa vai trò thành người viết bài";
          break;
        }
        case Role.Teller: {
          result.icon = <ContactMail />;
          result.sx = { color: "#79AC78" };
          result.text = "Sửa vai trò thành người dùng cơ bản";
          break;
        }
      }
      return result;
    }, [role]);

    const onClickButtonChangeRole = useCallback(() => {
      if (onChangeRole) {
        onChangeRole(id);
      }
    }, [id]);

    const onClickButtonBlock = useCallback(() => {
      if (onBlock) {
        onBlock(id);
      }
    }, [id]);

    return (
      <Grid
        item
        xs={12}
        height={1}
        container
        alignItems={"center"}
        columnGap={"8px"}
      >
        <Tooltip title={props.text}>
          <IconButton onClick={onClickButtonChangeRole} sx={props.sx}>
            {props.icon}
          </IconButton>
        </Tooltip>

        <Tooltip title="Chặn">
          <IconButton color="error" onClick={onClickButtonBlock}>
            <GppBad />
          </IconButton>
        </Tooltip>
      </Grid>
    );
  };
}
