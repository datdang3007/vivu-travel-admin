import {
  AccountBox,
  ContactMail,
  GppBad,
  AdminPanelSettings,
} from "@mui/icons-material";
import { Grid, IconButton, SxProps, Tooltip } from "@mui/material";
import { ReactNode, useCallback, useMemo } from "react";
import { Role } from "src/constants/role";
import { useMasterContext } from "src/context/MasterContext";
import { MuiTableCellProps } from "src/types/MuiTable";

type Props = {
  onChangeRole?: (email: string, role: number) => void;
  onClickSetAdmin?: (email: string) => void;
  onBlock?: (email: string) => void;
};

interface ChangeRoleProps {
  icon?: ReactNode;
  sx?: SxProps;
  text: string;
}

export function UserActionCell<T extends Record<string, any>>({
  onChangeRole,
  onClickSetAdmin,
  onBlock,
}: Props) {
  return function Cell({ row }: MuiTableCellProps<T>) {
    const email = row.original.email;
    const role = row.original.role.id;
    const { user } = useMasterContext();

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
        onChangeRole(email, role);
      }
    }, [email, role]);

    const onClickButtonSetAdmin = useCallback(() => {
      if (onClickSetAdmin) {
        onClickSetAdmin(email);
      }
    }, [email]);

    const onClickButtonBlock = useCallback(() => {
      if (onBlock) {
        onBlock(email);
      }
    }, [email]);

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

        {user?.role === Role.SuperAdmin && (
          <Tooltip title="Sửa vai trò thành quản trị viên">
            <IconButton
              onClick={onClickButtonSetAdmin}
              sx={{ color: "#61A3BA" }}
            >
              <AdminPanelSettings />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title="Chặn">
          <IconButton color="error" onClick={onClickButtonBlock}>
            <GppBad />
          </IconButton>
        </Tooltip>
      </Grid>
    );
  };
}
