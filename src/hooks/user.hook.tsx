import { useEffect, useMemo, useState } from "react";
import { RoleCell, TextCell, UserActionCell } from "src/components/Cell";
import { Role } from "src/constants/role";
import { useCallAPIFind } from "./common.hook";
import { StaffActionCell } from "src/components/Cell/StaffActionCell";

export const useUserListHook = () => {
  const { requestFindUserByRoles } = useCallAPIFind();
  const [userData, setUserData] = useState<any[]>([]);

  // SET UP COLUMN FIELD:
  const columns = useMemo(
    () => [
      {
        accessorKey: "username",
        header: "Tên",
        Cell: TextCell({}),
      },
      {
        accessorKey: "email",
        header: "Email",
        Cell: TextCell({}),
      },
      {
        accessorKey: "role.id",
        header: "Role",
        Cell: RoleCell({}),
      },
      {
        id: "button",
        header: "Thao Tác",
        Cell: UserActionCell({}),
        enableSorting: false,
        enableColumnActions: false,
      },
    ],
    []
  );

  useEffect(() => {
    const roles = [Role.User, Role.Teller];
    requestFindUserByRoles(roles.join(",")).then((res) => {
      setUserData(res);
    });
  }, [requestFindUserByRoles]);

  return {
    userData,
    columns,
  };
};

export const useStaffListHook = () => {
  const { requestFindUserByRoles } = useCallAPIFind();
  const [staffData, setStaffData] = useState<any[]>([]);

  // SET UP COLUMN FIELD:
  const columns = useMemo(
    () => [
      {
        accessorKey: "username",
        header: "Tên",
        Cell: TextCell({}),
      },
      {
        accessorKey: "email",
        header: "Email",
        Cell: TextCell({}),
      },
      {
        id: "button",
        header: "Thao Tác",
        Cell: StaffActionCell({}),
        enableSorting: false,
        enableColumnActions: false,
      },
    ],
    []
  );

  useEffect(() => {
    const roles = [Role.Admin];
    requestFindUserByRoles(roles.join(",")).then((res) => {
      setStaffData(res);
    });
  }, [requestFindUserByRoles]);

  return {
    staffData,
    columns,
  };
};
