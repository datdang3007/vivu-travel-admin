import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { FormTitleWithCheckBoxOptions } from "src/types/Form";

export const FormTitleWithCheckBox = (
  props: FormTitleWithCheckBoxOptions & CheckboxProps
) => {
  const {
    title,
    subtitle,
    checkBoxLabel = "",
    titleColor,
    children,
    mt,
    mb,
    titleSpacing,
    isTitleCenter,
    name,
    ...rest
  } = props;

  return (
    <Grid item container xs={12} mt={mt}>
      <Grid item container alignItems={"center"} xs={12} mb={mb}>
        <Grid item xs={6}>
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
        </Grid>
        <Grid item container justifyContent={"flex-end"} xs={6}>
          <Grid item container flexDirection={"column"} xs="auto">
            <FormControlLabel
              control={<Checkbox name="formTitleCheckBoxValue" {...rest} />}
              label={checkBoxLabel}
            />
          </Grid>
        </Grid>
      </Grid>
      {children}
    </Grid>
  );
};
