import { Grid } from "@mui/material";
import { ListAction } from "./ListAction";
import { ListActionItemProps } from "src/types";
import { useCallback } from "react";
import { PATH } from "src/routes/path";
import { useNavigate } from "react-router-dom";
import BarChartIcon from "@mui/icons-material/BarChart";
import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PublicIcon from "@mui/icons-material/Public";
import MapIcon from "@mui/icons-material/Map";
import PlaceIcon from "@mui/icons-material/Place";
import ApartmentIcon from "@mui/icons-material/Apartment";

export const SideBar = () => {
  const navigate = useNavigate();
  const changeDirection = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  const onClickLogOut = useCallback(() => {
    navigate(PATH.LOGIN);
  }, [navigate]);

  const ListActionComponent = [
    {
      title: "Thống Kê",
      actionList: [
        {
          id: PATH.STATISTICS,
          title: "Thống kê",
          icon: <BarChartIcon />,
          onClick: () => changeDirection(PATH.STATISTICS),
        },
      ],
    },
    {
      title: "Tài Khoản",
      actionList: [
        {
          id: PATH.USER_MANAGER,
          title: "Người dùng",
          icon: <PeopleIcon />,
          onClick: () => changeDirection(PATH.USER_MANAGER),
        },
        {
          id: PATH.STAFF_MANAGER,
          title: "Quản trị viên",
          icon: <AdminPanelSettingsIcon />,
          onClick: () => changeDirection(PATH.STAFF_MANAGER),
        },
      ],
    },
    {
      title: "Quản Lý Dữ Liệu",
      actionList: [
        {
          id: PATH.REGION,
          title: "Miền",
          icon: <PublicIcon />,
          onClick: () => changeDirection(PATH.REGION),
        },
        {
          id: PATH.TERRITORY,
          title: "Vùng",
          icon: <MapIcon />,
          onClick: () => changeDirection(PATH.TERRITORY),
        },
        {
          id: PATH.PROVINCE,
          title: "Tỉnh Thành",
          icon: <PlaceIcon />,
          onClick: () => changeDirection(PATH.PROVINCE),
        },
        {
          id: PATH.PLACE,
          title: "Địa Điểm",
          icon: <ApartmentIcon />,
          onClick: () => changeDirection(PATH.PLACE),
        },
      ],
    },
  ] as ListActionItemProps[];

  return (
    <Grid item xs={12} height={1}>
      <ListAction list={ListActionComponent} clickLogout={onClickLogOut} />
    </Grid>
  );
};
