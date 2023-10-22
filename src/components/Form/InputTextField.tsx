import {
  TextField,
  TextFieldProps,
  InputLabelProps,
  Grid,
} from "@mui/material";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { FormHelpText } from "./FormHelpText";

export const InputTextField = (
  props: InputLabelProps & TextFieldProps & UseControllerProps<FieldValues>
) => {
  const { name, control, rules, variant, ...rest } = props;
  const { field, fieldState } = useController({
    name,
    control,
    rules,
  });
  const error = Boolean(fieldState.error);
  return (
    <Grid item container flexDirection={"column"}>
      <TextField variant={variant} {...field} {...rest} error={error} />
      <FormHelpText fieldState={fieldState} />
    </Grid>
  );
};
