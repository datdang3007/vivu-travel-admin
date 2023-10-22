import { BoxImage } from "src/UI";
import { CardItemProps } from "src/types/Ui";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  styled,
} from "@mui/material";

export const CardItem = (props: CardItemProps) => {
  const { name, slogan, img } = props;

  return (
    <CardComponent>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Box width={1} sx={{ aspectRatio: "2/1", maxHeight: "320px" }}>
            <BoxImage src={img} />
          </Box>
        </Grid>
        <CardContent>
          <GridOneLine item xs={12}>
            <Typography
              fontSize={22}
              fontWeight={"bold"}
              textTransform={"none"}
            >
              {name}
            </Typography>
          </GridOneLine>
          <GridOneLine item xs={12}>
            <Typography fontSize={16} textTransform={"none"}>
              {slogan}
            </Typography>
          </GridOneLine>
        </CardContent>
        <CardActionComponent>
          <Grid
            item
            container
            justifyContent={"flex-end"}
            columnGap={"10px"}
            xs={12}
          >
            <ButtonEdit variant="contained" size="small" color="success">
              <Typography fontSize={14} textTransform={"none"}>
                Sửa
              </Typography>
            </ButtonEdit>
            <ButtonDetail variant="contained" size="small" color="primary">
              <Typography fontSize={14} textTransform={"none"}>
                Chi Tiết
              </Typography>
            </ButtonDetail>
            <ButtonDelete variant="contained" size="small" color="error">
              <Typography fontSize={14} textTransform={"none"}>
                Xóa
              </Typography>
            </ButtonDelete>
          </Grid>
        </CardActionComponent>
      </Grid>
    </CardComponent>
  );
};

const CardComponent = styled(Card)({});

const GridOneLine = styled(Grid)({
  display: "-webkit-box",
  overflow: "hidden !important",
  textOverflow: "ellipsis !important",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 1,
});

const CardActionComponent = styled(CardActions)({
  padding: "20px",
});

const ButtonEdit = styled(Button)({});
const ButtonDetail = styled(Button)({});
const ButtonDelete = styled(Button)({});
