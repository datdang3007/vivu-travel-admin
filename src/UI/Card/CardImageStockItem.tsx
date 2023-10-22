import { Box, Grid, Tooltip, Typography, styled } from "@mui/material";
import { BoxImage } from "../Box/BoxImage";
import { COLOR_PALLETTE } from "src/constants/color";
import { Link } from "react-router-dom";
import { PATH } from "src/routes/path";

export const CardImageStockItem = () => {
  return (
    <Link
      to={PATH.IMAGE_LIST}
      target="_blank"
      style={{
        textDecoration: "none",
      }}
    >
      <Tooltip title={"Núi Fansipan"}>
        <CardContainer item xs={12} height={1}>
          <Grid item xs={12} height={"80%"}>
            <Box width={1} height={1}>
              <BoxImage src="https://cdn.discordapp.com/attachments/1089123119668658206/1112293025171898478/01-Fansipan-3-1024x576.jpg" />
            </Box>
          </Grid>
          <Grid
            item
            container
            alignItems={"center"}
            xs={12}
            height={"20%"}
            padding={"10px"}
          >
            <GridOneLine item xs={12}>
              <Typography
                fontSize={"18px"}
                color={COLOR_PALLETTE.BLACK}
                fontWeight={"bold"}
              >
                Núi Fansipan
              </Typography>
            </GridOneLine>
          </Grid>
        </CardContainer>
      </Tooltip>
    </Link>
  );
};

const CardContainer = styled(Grid)({
  borderRadius: "4px",
  overflow: "hidden",
  background: COLOR_PALLETTE.WHITE,
  boxShadow: `rgba(0, 0, 0, 0.16) 0px 1px 4px`,
});

const GridOneLine = styled(Grid)({
  display: "-webkit-box",
  overflow: "hidden !important",
  textOverflow: "ellipsis !important",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 1,
});
