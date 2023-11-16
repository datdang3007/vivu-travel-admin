import { AttachFile } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  inputRef: React.Ref<any>;
  openSelectFile?: () => void;
};

export const DialogSelectImage = (props: Props) => {
  const { open, onClose, onSubmit, inputRef, openSelectFile } = props;

  const canSelectFile = useMemo(
    () => Boolean(openSelectFile),
    [openSelectFile]
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"sm"} fullWidth>
      <DialogTitle>
        <Typography
          sx={{
            fontSize: {
              xs: 20,
              sm: 22,
              md: 24,
            },
            fontWeight: "bold",
          }}
        >
          Chọn Ảnh
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Hình ảnh"
          placeholder="Link URL"
          inputRef={inputRef}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: canSelectFile ? (
              <InputAdornment position="end">
                <IconButton onClick={openSelectFile} edge="end">
                  <AttachFile />
                </IconButton>
              </InputAdornment>
            ) : undefined,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          <Typography textTransform={"none"}>Đóng</Typography>
        </Button>
        <Button variant="contained" onClick={onSubmit}>
          <Typography textTransform={"none"}>Chọn</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
