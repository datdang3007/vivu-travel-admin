import { ActionProps } from "../../types";
import { Button, Grid, Tooltip, Typography, styled } from "@mui/material";
import { COLOR_PALLETTE } from "../../constants/color";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { useMasterContext } from "src/context/MasterContext";

export const ActionItem = (props: ActionProps) => {
  const location = useLocation();
  const { id, title, icon, onClick } = props;
  const { isDesktop } = useMasterContext();

  const isButtonActive = useMemo(() => {
    const path = location.pathname;
    return path === id;
  }, [id, location.pathname]);

  return (
    <Grid item xs={12} mt={{ xs: "0", lg: "10px" }}>
      <Tooltip title={!isDesktop ? title : ""} placement="right">
        <ButtonAction
          fullWidth
          onClick={onClick}
          className={isButtonActive ? "active" : ""}
          sx={{
            padding: { xs: "15px 0", lg: "15px" },
          }}
        >
          <Grid item container alignItems={"center"} xs={12}>
            <Grid
              item
              container
              alignItems={"center"}
              justifyContent={{ xs: "center", lg: undefined }}
              xs={12}
              lg="auto"
            >
              {icon}
            </Grid>
            <Grid
              item
              xs={12}
              lg
              ml={"5px"}
              textAlign={"left"}
              display={{ xs: "none", lg: "block" }}
            >
              <Typography fontSize={"14px"}>{title}</Typography>
            </Grid>
            <Grid
              item
              container
              alignItems="center"
              xs="auto"
              display={{ xs: "none", lg: "flex" }}
            >
              <ArrowRightIcon />
            </Grid>
          </Grid>
        </ButtonAction>
      </Tooltip>
    </Grid>
  );
};

const ButtonAction = styled(Button)(({ theme }) => ({
  borderRadius: "25px 0 0 25px",
  color: COLOR_PALLETTE.WHITE,
  "&.active": {
    background: COLOR_PALLETTE.WHITE,
    color: COLOR_PALLETTE.PRIMARY,
  },
  "&:hover": {
    background: COLOR_PALLETTE.WHITE,
    color: COLOR_PALLETTE.PRIMARY,
  },
  [theme.breakpoints.down("lg")]: {
    padding: "5px",
    borderRadius: "0",
  },
}));
