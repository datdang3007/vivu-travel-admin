import {
  Grid,
  IconButton,
  InputAdornment,
  InputLabelProps,
  TextField,
  TextFieldProps,
  Typography,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FormTitleWithSearchOptions } from "src/types/Form";
import { useController } from "react-hook-form";
import { FieldValues, UseControllerProps } from "react-hook-form";
import { COLOR_PALLETTE } from "src/constants/color";

export const FormTitleWithSearch = (
  props: FormTitleWithSearchOptions &
    InputLabelProps &
    TextFieldProps &
    UseControllerProps<FieldValues>
) => {
  const {
    title,
    subtitle,
    titleColor,
    children,
    mt,
    mb,
    titleSpacing,
    isTitleCenter,
    name,
    control,
    rules,
    variant,
    ...rest
  } = props;

  const { field, fieldState } = useController({
    name,
    control,
    rules,
  });
  const error = Boolean(fieldState.error);

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
        <Grid item container justifyContent={"flex-end"} xs={6}>
          <Grid item container flexDirection={"column"} xs={12} lg={6}>
            <SearchField
              variant="outlined"
              {...field}
              {...rest}
              error={error}
              placeholder="Tìm kiếm..."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => console.log("onClick")}
                      edge="end"
                      sx={{
                        "&:hover": {
                          color: COLOR_PALLETTE.BLACK,
                        },
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      {children}
    </Grid>
  );
};

const SearchField = styled(TextField)(({ theme }) => ({
  margin: "0px",
  div: {
    input: {
      padding: "10px 0px 10px 16px",
    },
  },
  [theme.breakpoints.down("lg")]: {
    margin: "0px 20px",
  },
}));
