import { Box, Grid, styled } from "@mui/material";
import { ListActionProps } from "src/types";
import { ListActionItem } from "./ListActionItem";
import { COLOR_PALLETTE } from "src/constants/color";
import { ActionItem } from "./ActionItem";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

export const ListAction = (props: ListActionProps) => {
  const { list, clickLogout } = props;

  return (
    <ListActionContainer item xs={12} height={1}>
      <Grid item xs={12} height={1} position={"relative"}>
        {list.map((val, index) => (
          <ListActionItem
            key={index}
            title={val.title}
            actionList={val.actionList}
          />
        ))}
        <ButtonLogout>
          <ActionItem
            title={"Đăng xuất"}
            icon={<LogoutRoundedIcon />}
            onClick={clickLogout}
          />
        </ButtonLogout>
      </Grid>
    </ListActionContainer>
  );
};

const ListActionContainer = styled(Grid)(({ theme }) => ({
  background: COLOR_PALLETTE.PRIMARY,
  padding: "20px",
  paddingBottom: "15px",
  paddingRight: 0,
  [theme.breakpoints.down("lg")]: {
    padding: "0",
  },
}));

const ButtonLogout = styled(Box)({
  position: "absolute",
  bottom: 0,
  width: "100%",
});
