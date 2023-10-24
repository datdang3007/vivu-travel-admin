import { ImageOutlined } from "@mui/icons-material";
import {
  Button,
  Grid,
  InputLabelProps,
  TextField,
  TextFieldProps,
  Typography,
  styled,
} from "@mui/material";
import { useCallback, useMemo, useRef, useState } from "react";
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
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { field, fieldState } = useController({
    name,
    control,
    rules,
  });
  const error = Boolean(fieldState.error);
  const url = useMemo(() => field.value, [field]);

  const onClickOpenSelectFile = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const onChange = useCallback(
    (event: any) => {
      const file = event.target.files[0];
      if (!file) return;
      UploadFileToDiscordWebhook(file).then((linkUrl: any) => {
        if (!linkUrl) return;
        field.onChange(linkUrl);
      });
    },
    [field]
  );

  return (
    <Grid container>
      <Grid container display="none">
        <TextField
          variant={variant}
          {...rest}
          type="file"
          inputRef={fileInputRef}
          onChange={onChange}
          error={error}
        />
      </Grid>
      <Grid item xs={12} md={8} xl={6}>
        {url ? (
          <ButtonPreviewImage fullWidth onClick={onClickOpenSelectFile}>
            <BoxImage src={url} />
          </ButtonPreviewImage>
        ) : (
          <>
            <ButtonSelectImage
              fullWidth
              color={error ? "error" : undefined}
              variant="outlined"
              onClick={onClickOpenSelectFile}
              sx={{
                mb: "8px",
              }}
            >
              <Grid
                item
                xs="auto"
                container
                alignItems={"center"}
                justifyContent={"center"}
                columnGap={"8px"}
              >
                <Typography textTransform={"none"}>Chọn ảnh</Typography>
                <ImageOutlined />
              </Grid>
            </ButtonSelectImage>
            <FormHelpText fieldState={fieldState} />
          </>
        )}
      </Grid>
    </Grid>
  );
};

const ButtonSelectImage = styled(Button)({
  borderStyle: "dashed",
  aspectRatio: "9/5",
});

const ButtonPreviewImage = styled(Button)({
  padding: "0",
  borderRadius: "4px",
  overflow: "hidden",
  aspectRatio: "9/5",
});
