import { Grid, Typography, styled } from "@mui/material";
import { COLOR_PALLETTE } from "src/constants/color";
import { ListActionItemProps } from "src/types";
import { ActionItem } from "./ActionItem";

export const ListActionItem = (props: ListActionItemProps) => {
  const { title, actionList } = props;

  return (
    <ListActionItemGrid item xs={12} mt={{ xs: "0", lg: "20px" }}>
      <Grid item xs={12} display={{ xs: "none", lg: "block" }}>
        <Typography
          fontSize={"20px"}
          fontWeight={"bold"}
          color={COLOR_PALLETTE.WHITE}
        >
          {title}
        </Typography>
      </Grid>
      {actionList.map((val) => (
        <ActionItem
          key={val.id}
          id={val.id}
          title={val.title}
          icon={val.icon}
          onClick={val.onClick}
        />
      ))}
    </ListActionItemGrid>
  );
};

const ListActionItemGrid = styled(Grid)({
  "&:first-of-type": {
    marginTop: 0,
  },
});
