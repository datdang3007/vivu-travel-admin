import {
  Box,
  Button,
  Grid,
  InputLabelProps,
  TextField,
  TextFieldProps,
  Typography,
  styled,
} from "@mui/material";
import { useCallback, useState } from "react";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { BoxImage } from "src/UI";
import { UploadFileToDiscordWebhook } from "src/utils/common";
import { FormHelpText } from "./FormHelpText";

export const FormUploadImage = (
  props: InputLabelProps & TextFieldProps & UseControllerProps<FieldValues>
) => {
  const { name, control, rules, variant, ...rest } = props;
  const [url, setUrl] = useState(null);
  const { field, fieldState } = useController({
    name,
    control,
    rules,
  });
  const error = Boolean(fieldState.error);

  const onChange = useCallback(
    (event: any) => {
      const file = event.target.files[0];
      if (!file) return;
      UploadFileToDiscordWebhook(file).then((linkUrl: any) => {
        if (!linkUrl) return;
        field.value = linkUrl;
        setUrl(linkUrl);
      });
    },
    [field]
  );

  return (
    <Grid container flexDirection={"column"}>
      <Grid container display="none">
        <TextField
          variant={variant}
          {...field}
          {...rest}
          type="file"
          onChange={onChange}
          error={error}
        />
        <FormHelpText fieldState={fieldState} />
      </Grid>
      <Grid item xs={12} xl={6}>
        {url ? (
          <ButtonPreviewImage fullWidth>
            <Box sx={{ width: "100%", aspectRatio: "9/5" }}>
              <BoxImage src={url} />
            </Box>
          </ButtonPreviewImage>
        ) : (
          <ButtonSelectImage fullWidth variant="outlined">
            <Box sx={{ width: "100%", aspectRatio: "9/5" }}>
              <Typography textTransform={"none"}>Chọn Ảnh</Typography>
            </Box>
          </ButtonSelectImage>
        )}
      </Grid>
    </Grid>
  );
};

const ButtonSelectImage = styled(Button)({
  display: "block",
  borderStyle: "dashed",
});

const ButtonPreviewImage = styled(Button)({
  padding: "0",
  borderRadius: "4px",
  overflow: "hidden",
});
