import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import { SideBar } from "src/components/SideBar";
import { COLOR_PALLETTE } from "src/constants/color";

export const MainLayout = () => {
  return (
    <Grid item container xs={12} sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        maxWidth={{
          xs: "80px !important",
          lg: "230px !important",
          xl: "288px !important",
        }}
        height={1}
      >
        <SideBar />
      </Grid>
      <Grid
        item
        xs
        height={1}
        sx={{ overflowY: "auto", background: COLOR_PALLETTE.CULTURED_F5 }}
      >
        <Outlet />
      </Grid>
    </Grid>
  );
};
