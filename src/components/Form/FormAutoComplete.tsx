import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import {
  Autocomplete,
  Checkbox,
  Grid,
  InputLabelProps,
  InputProps,
  TextField,
  TextFieldProps,
  styled,
} from "@mui/material";
import { useCallback } from "react";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { AutoCompleteOptions } from "src/types/Form";
import { FormHelpText } from "./FormHelpText";

type Props = InputLabelProps &
  TextFieldProps &
  InputProps & {
    items: AutoCompleteOptions[];
  };

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

export const FormAutoComplete = (
  props: Props & UseControllerProps<FieldValues>
) => {
  const { name, control, items, rules, ...rest } = props;
  const { field, fieldState } = useController({ name, control, rules });
  const fieldStateError = fieldState.error;
  const error = Boolean(fieldStateError);

  const renderInputCallback = useCallback(
    (params: any) => {
      return (
        <>
          <TextField {...params} error={error} {...rest} />
          {error && <FormHelpText fieldState={fieldState} />}
        </>
      );
    },
    [error, fieldState, rest]
  );

  const handleChange = useCallback(
    (_event: React.SyntheticEvent, newValue: AutoCompleteOptions[] | null) => {
      if (newValue) {
        field.onChange(newValue);
      }
    },
    [field]
  );

  return (
    <GridAutoComplete item xs={12}>
      <Autocomplete
        {...field}
        fullWidth
        multiple
        disablePortal
        disableCloseOnSelect
        options={items}
        onChange={handleChange}
        renderInput={renderInputCallback}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) =>
          option?.id?.toString() === (value?.id ?? value)?.toString()
        }
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.label}
          </li>
        )}
      />
    </GridAutoComplete>
  );
};

const GridAutoComplete = styled(Grid)({});
