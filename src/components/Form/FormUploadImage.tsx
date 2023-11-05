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
import { showAlertError } from "src/utils/alert";
import { CheckIsImageUrl, UploadFileToDiscordWebhook } from "src/utils/common";
import { DialogSelectImage } from "../Dialog";
import { FormHelpText } from "./FormHelpText";

export const FormUploadImage = (
  props: InputLabelProps & TextFieldProps & UseControllerProps<FieldValues>
) => {
  const { name, control, rules, variant, ...rest } = props;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputLinkRef = useRef<HTMLInputElement | null>(null);
  const { field, fieldState } = useController({
    name,
    control,
    rules,
  });
  const error = Boolean(fieldState.error);
  const url = useMemo(() => field.value, [field]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = useCallback(() => {
    setOpenDialog(true);
    setTimeout(() => {
      if (fileInputLinkRef.current) {
        fileInputLinkRef.current.focus();
      }
    }, 100);
  }, []);
  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  const onClickOpenSelectFile = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const onChange = useCallback(
    (event: any) => {
      const file = event.target.files[0];
      if (!file) return;
      setOpenDialog(false);
      UploadFileToDiscordWebhook(file).then((linkUrl: any) => {
        if (!linkUrl) return;
        field.onChange(linkUrl);
      });
    },
    [field]
  );

  const onClickSubmitLink = useCallback(async () => {
    if (!fileInputLinkRef.current) return;
    const imageUrl = fileInputLinkRef.current.value;
    CheckIsImageUrl(imageUrl)
      .then((isImage) => {
        if (!isImage) {
          return showAlertError(
            "Lỗi !",
            "Link ảnh không hợp lệ, vui lòng kiểm tra lại"
          );
        }
        setOpenDialog(false);
        field.onChange(imageUrl);
      })
      .catch((error) => {
        showAlertError(
          "Lỗi !",
          `Lỗi xảy ra khi kiểm tra liên kết hình ảnh: ${error}`
        );
      });
  }, [field]);

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
      <Grid item xs={12} xl={8}>
        {url ? (
          <ButtonPreviewImage fullWidth onClick={handleOpenDialog}>
            <BoxImage src={url} />
          </ButtonPreviewImage>
        ) : (
          <>
            <ButtonSelectImage
              fullWidth
              color={error ? "error" : undefined}
              variant="outlined"
              onClick={handleOpenDialog}
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
      <DialogSelectImage
        open={openDialog}
        onClose={handleCloseDialog}
        inputRef={fileInputLinkRef}
        onSubmit={onClickSubmitLink}
        openSelectFile={onClickOpenSelectFile}
      />
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
