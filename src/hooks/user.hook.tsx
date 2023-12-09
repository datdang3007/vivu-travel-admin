import { useCallback, useEffect, useMemo, useState } from "react";
import { RoleCell, TextCell, UserActionCell } from "src/components/Cell";
import { Role } from "src/constants/role";
import { useCallAPIAuth, useCallAPIFind } from "./common.hook";
import { StaffActionCell } from "src/components/Cell/StaffActionCell";
import { showAlertError, showAlertSuccess } from "src/utils/alert";
import { useMasterContext } from "src/context/MasterContext";

export const useUserListHook = () => {
  const { user } = useMasterContext();
  const { requestFindUserByRoles } = useCallAPIFind();
  const [userData, setUserData] = useState<any[]>([]);
  const { requestUpdateUserRole } = useCallAPIAuth();

  const onChangeRole = useCallback(
    (email: string, role: number) => {
      const currentUserRole = user?.role as number;
      if (
        !currentUserRole ||
        ![Role.Admin, Role.SuperAdmin].includes(currentUserRole)
      ) {
        showAlertError(
          "Cấp quyền không thành công",
          "Bạn không thể cấp quyền cho người dùng!"
        );
        return;
      }

      const newRole = Number(role) !== Role.User ? Role.User : Role.Teller;
      const dataUpdate = {
        user_email: email,
        role_id: newRole,
      };

      requestUpdateUserRole(dataUpdate).then(() => {
        showAlertSuccess(
          "Chỉnh sửa quyền thành công",
          "Đã cập nhật quyền của người dùng!"
        );
        setTimeout(() => {
          const roles = [Role.User, Role.Teller];
          requestFindUserByRoles(roles.join(",")).then((res) => {
            setUserData(res);
          });
        }, 2000);
      });
    },
    [requestFindUserByRoles, requestUpdateUserRole, user]
  );

  const onClickSetAdmin = useCallback(
    (email: string) => {
      const currentUserRole = user?.role as number;
      if (currentUserRole !== Role.SuperAdmin) {
        showAlertError(
          "Cấp quyền không thành công",
          "Bạn không thể cấp quyền cho người dùng!"
        );
        return;
      }

      const dataUpdate = {
        user_email: email,
        role_id: Role.Admin,
      };

      requestUpdateUserRole(dataUpdate).then(() => {
        showAlertSuccess(
          "Chỉnh sửa quyền thành công",
          "Đã cập nhật quyền của người dùng!"
        );
        setTimeout(() => {
          const roles = [Role.User, Role.Teller];
          requestFindUserByRoles(roles.join(",")).then((res) => {
            setUserData(res);
          });
        }, 2000);
      });
    },
    [requestFindUserByRoles, requestUpdateUserRole, user]
  );

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
        Cell: UserActionCell({ onChangeRole, onClickSetAdmin }),
        enableSorting: false,
        enableColumnActions: false,
      },
    ],
    [onChangeRole, onClickSetAdmin]
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
  const { user } = useMasterContext();
  const { requestFindUserByRoles } = useCallAPIFind();
  const [staffData, setStaffData] = useState<any[]>([]);
  const { requestUpdateUserRole } = useCallAPIAuth();

  const onRemove = useCallback(
    (email: string) => {
      const currentUserRole = user?.role as number;
      if (currentUserRole !== Role.SuperAdmin) {
        showAlertError(
          "Cấp quyền không thành công",
          "Bạn không thể cấp quyền cho người dùng!"
        );
        return;
      }

      const dataUpdate = {
        user_email: email,
        role_id: Role.User,
      };

      requestUpdateUserRole(dataUpdate).then(() => {
        showAlertSuccess(
          "Chỉnh sửa quyền thành công",
          "Đã cập nhật quyền của người dùng!"
        );
        setTimeout(() => {
          const roles = [Role.Admin];
          requestFindUserByRoles(roles.join(",")).then((res) => {
            setStaffData(res);
          });
        }, 2000);
      });
    },
    [requestFindUserByRoles, requestUpdateUserRole, user]
  );

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
        Cell: StaffActionCell({ onRemove }),
        enableSorting: false,
        enableColumnActions: false,
      },
    ],
    [onRemove]
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
