import {
  Autocomplete,
  Grid,
  InputLabelProps,
  InputProps,
  TextField,
  TextFieldProps,
  styled,
} from "@mui/material";
import { AutoCompleteOptions } from "src/types/Form";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { FormHelpText } from "./FormHelpText";

type Props = InputLabelProps &
  TextFieldProps &
  InputProps & {
    items: AutoCompleteOptions[];
  };

export const FormAutoComplete = (
  props: Props & UseControllerProps<FieldValues>
) => {
  const { name, sx, control, placeholder, items, rules } = props;
  const { field, fieldState } = useController({ name, control, rules });
  const [value, setValue] = useState<AutoCompleteOptions | null>(null);
  const fieldStateError = fieldState.error;
  const error = Boolean(fieldStateError);

  const renderInputCallback = useCallback(
    (params: any) => {
      return (
        <>
          <TextField
            placeholder={placeholder}
            error={error}
            sx={sx}
            {...params}
            {...field}
          />
          {error && <FormHelpText fieldState={fieldState} />}
        </>
      );
    },
    [error, field, fieldState, placeholder, sx]
  );

  const handleChange = useCallback(
    (_event: React.SyntheticEvent, newValue: AutoCompleteOptions | null) => {
      if (newValue) {
        field.onChange(newValue.id);
        setValue(newValue);
      }
    },
    [field]
  );

  const handleOnInputChange = useCallback(
    (_event: React.SyntheticEvent, newValue: string) => {
      const valueTmp = items.find(
        (item: AutoCompleteOptions) => item.label === newValue
      );
      if (valueTmp) {
        field.onChange(valueTmp.id);
        setValue(valueTmp);
      }
    },
    [field, items]
  );

  useEffect(() => {
    if (field.value && value == null) {
      const valueTmp = items.find(
        (item: AutoCompleteOptions) =>
          item.id.toString() === field.value.toString()
      );
      if (valueTmp) {
        field.onChange(valueTmp.id);
        setValue(valueTmp);
      }
    }
  }, [field, items, value]);

  return (
    <GridAutoComplete item xs={12}>
      <Autocomplete
        value={value}
        className="auto-complete-pd"
        fullWidth
        disablePortal
        options={items}
        renderInput={renderInputCallback}
        onChange={handleChange}
        onInputChange={handleOnInputChange}
      />
    </GridAutoComplete>
  );
};

const GridAutoComplete = styled(Grid)({});
