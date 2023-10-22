import { Add, CloudUpload } from "@mui/icons-material";
import { COLOR_PALLETTE } from "src/constants/color";
import { Button, Grid, Typography, styled } from "@mui/material";
import {
  FieldValues,
  useController,
  UseControllerProps,
  UseFieldArrayProps,
} from "react-hook-form";
import { useCallback } from "react";

type Props = {
  id?: string;
};

export const FormInputImage = (
  props: Props &
    UseControllerProps<FieldValues> &
    UseFieldArrayProps<FieldValues>
) => {
  const { id, name, control, rules } = props;
  const { fieldState } = useController({ name, control, rules });
  const error = Boolean(fieldState.error?.root?.message);

  // HANDLE EVENT:
  const handleAttachFile = useCallback((data: any) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const file = reader.result?.toString() ?? "";
      console.log(file);
    });
    reader.readAsDataURL(data);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const data = e.target.files?.[0];
      if (data) {
        handleAttachFile(data);
      }
      e.target.value = "";
    },
    [handleAttachFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file) {
        handleAttachFile(file);
      }
    },
    [handleAttachFile]
  );
  const onDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  return (
    <BoxContainer
      id={id}
      item
      container
      xs={12}
      height={1}
      onDrop={handleDrop}
      onDragEnter={onDrag}
      onDragOver={onDrag}
      onDragLeave={onDrag}
      sx={{
        backgroundColor: error ? COLOR_PALLETTE.ERROR : COLOR_PALLETTE.WHITE,
        border: `2px solid ${
          error ? COLOR_PALLETTE.ERROR : COLOR_PALLETTE.STONE_WALL_GREY
        }`,
      }}
    >
      <Button color={"inherit"} fullWidth component="label">
        <input
          type="file"
          hidden
          multiple={false}
          accept=".jpg,.jpeg,.png"
          onChange={handleFileSelect}
        />
        <Grid
          item
          container
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
          sx={{ height: 1 }}
        >
          <Grid item xs={"auto"}>
            <IconCloud />
          </Grid>
          <Grid item container alignItems={"center"} xs={"auto"}>
            <Add />
            <Typography textTransform={"none"}>Upload File Ảnh</Typography>
          </Grid>
        </Grid>
      </Button>
    </BoxContainer>
  );
};

const BoxContainer = styled(Grid)({
  borderRadius: "4px",
  color: "#A0A0A0",
});

const IconCloud = styled(CloudUpload)({
  width: "80px",
  height: "80px",
  color: COLOR_PALLETTE.STONE_WALL_GREY,
});
