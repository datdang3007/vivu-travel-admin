import { Grid, Typography } from "@mui/material";
import { FormTitleWithButtonOptions } from "src/types/Form";

export const FormTitleWithButton = (props: FormTitleWithButtonOptions) => {
  const {
    title,
    subtitle,
    titleColor,
    buttonComponent,
    children,
    mt,
    mb,
    titleSpacing,
    isTitleCenter,
  } = props;

  return (
    <Grid item container xs={12} mt={mt}>
      <Grid item container alignItems={"center"} xs={12} mb={mb}>
        <Grid item xs>
          <Grid
            item
            container
            justifyContent={isTitleCenter ? "center" : "flex-start"}
            xs={12}
          >
            <Typography
              textAlign={isTitleCenter ? "center" : undefined}
              sx={{
                color: titleColor,
                fontSize: {
                  xs: 25,
                  sm: 30,
                  md: 35,
                },
                fontWeight: "bold",
              }}
            >
              {title}
            </Typography>
          </Grid>
          <Grid
            item
            container
            justifyContent={isTitleCenter ? "center" : "flex-start"}
            xs={12}
          >
            <Grid item xs={11}>
              <Typography
                mt={titleSpacing}
                textAlign={isTitleCenter ? "center" : undefined}
                sx={{
                  fontSize: {
                    xs: 15,
                    sm: 18,
                    md: 20,
                  },
                }}
              >
                {subtitle}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container justifyContent={"flex-end"} xs={"auto"}>
          <Grid item>{buttonComponent}</Grid>
        </Grid>
      </Grid>
      {children}
    </Grid>
  );
};
