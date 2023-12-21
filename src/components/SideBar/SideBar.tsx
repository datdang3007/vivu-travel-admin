import {
  AdminPanelSettings,
  Apartment,
  Map,
  People,
  Place,
  Public,
  TaskOutlined,
} from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE } from "src/constants/local_storage";
import { Role } from "src/constants/role";
import { useMasterContext } from "src/context/MasterContext";
import { useCallAPIAuth } from "src/hooks/common.hook";
import { PATH } from "src/routes/path";
import { ListActionItemProps } from "src/types";
import { ListAction } from "./ListAction";

export const SideBar = () => {
  const navigate = useNavigate();
  const { user } = useMasterContext();
  const { requestGetUserProfile } = useCallAPIAuth();

  const changeDirection = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  const onClickLogOut = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE.AccessToken);
    localStorage.removeItem(LOCAL_STORAGE.UserRole);
    requestGetUserProfile();
    navigate(PATH.LOGIN);
  }, [navigate, requestGetUserProfile]);

  const ListActionComponent = useMemo(() => {
    if (!user) return [];
    const actions = [
      // {
      //   title: "Thống Kê",
      //   actionList: [
      //     {
      //       id: PATH.STATISTICS,
      //       title: "Thống kê",
      //       icon: <BarChart />,
      //       role: [Role.SuperAdmin, Role.Admin],
      //       onClick: () => changeDirection(PATH.STATISTICS),
      //     },
      //   ],
      // },
      {
        title: "Tài Khoản",
        actionList: [
          {
            id: PATH.USER_MANAGER,
            title: "Người dùng",
            icon: <People />,
            role: [Role.SuperAdmin, Role.Admin],
            onClick: () => changeDirection(PATH.USER_MANAGER),
          },
          {
            id: PATH.STAFF_MANAGER,
            title: "Quản trị viên",
            icon: <AdminPanelSettings />,
            role: [Role.SuperAdmin],
            onClick: () => changeDirection(PATH.STAFF_MANAGER),
          },
        ],
      },
      {
        title: "Bài Viết",
        actionList: [
          {
            id: PATH.POST_MANAGER,
            title: "Duyệt bài",
            icon: <TaskOutlined />,
            role: [Role.SuperAdmin, Role.Admin],
            onClick: () => changeDirection(PATH.POST_MANAGER),
          },
        ],
      },
      {
        title: "Quản Lý Dữ Liệu",
        actionList: [
          {
            id: PATH.REGION,
            title: "Miền",
            icon: <Public />,
            role: [Role.SuperAdmin, Role.Admin],
            onClick: () => changeDirection(PATH.REGION),
          },
          {
            id: PATH.TERRITORY,
            title: "Vùng",
            icon: <Map />,
            role: [Role.SuperAdmin, Role.Admin],
            onClick: () => changeDirection(PATH.TERRITORY),
          },
          {
            id: PATH.PROVINCE,
            title: "Tỉnh Thành",
            icon: <Place />,
            role: [Role.SuperAdmin, Role.Admin],
            onClick: () => changeDirection(PATH.PROVINCE),
          },
          {
            id: PATH.PLACE,
            title: "Địa Điểm",
            icon: <Apartment />,
            role: [Role.SuperAdmin, Role.Admin],
            onClick: () => changeDirection(PATH.PLACE),
          },
        ],
      },
    ];

    const filterRole = actions.map((action) => {
      const newAction = { ...action };
      newAction.actionList = action.actionList.filter((val) =>
        val.role.includes(user.role)
      );
      if (!newAction.actionList) {
        return null;
      }
      return newAction;
    });
    return filterRole as ListActionItemProps[];
  }, [changeDirection, user]);

  return (
    <Grid item xs={12} height={1}>
      <ListAction list={ListActionComponent} clickLogout={onClickLogOut} />
    </Grid>
  );
};
