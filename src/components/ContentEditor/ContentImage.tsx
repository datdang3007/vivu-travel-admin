import {
  DeleteForever,
  ImageOutlined,
  InsertPhoto,
  Label,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  Grid,
  Menu,
  MenuItem,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useCallback, useMemo, useRef, useState } from "react";
import { BoxImage } from "src/UI";
import { COLOR_PALLETTE } from "src/constants/color";
import { CONTENT_TYPE } from "src/constants/content";
import { ContentDataProps } from "src/types";
import { CheckIsImageUrl, UploadFileToDiscordWebhook } from "src/utils/common";
import { DialogSelectImage } from "../Dialog";
import { showAlertError } from "src/utils/alert";

type Props = {
  id: string | number;
  data: any[];
  handleChange: (data: ContentDataProps[]) => void;
};

export const ContentImage = (props: Props) => {
  const { id, data, handleChange } = props;
  const fieldData = data.find((val) => val.id === id)?.content;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputLinkRef = useRef<HTMLInputElement | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const open = Boolean(anchorEl);

  // OPEN / CLOSE DIALOG LINK IMAGE:
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

  // CLICK TO INPUT TYPE FILE:
  const onClickOpenSelectFile = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  // OPEN / CLOSE MENU:
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  //   EVENT ON FIELD CHANGE:
  const onChange = useCallback(
    (event: any) => {
      const file = event.target.files[0];
      if (!file) return;
      UploadFileToDiscordWebhook(file).then((linkUrl: any) => {
        if (!linkUrl) return;
        const currentData = [...data];
        const newData = currentData.map((val) => {
          if (val.id === id) {
            val.content = linkUrl as string;
          }
          return val;
        });
        handleChange(newData);
        setOpenDialog(false);
      });
    },
    [data, handleChange, id]
  );

  //   EVENT WHEN CHOSE OPTION:
  const handleChangeType = useCallback(
    (type: number) => {
      const currentData = [...data];
      const newData = currentData.map((val) => {
        if (val.id === id) {
          val.type = type;
          val.content = "";
        }
        return val;
      });
      handleChange(newData);
    },
    [data, handleChange, id]
  );

  //   EVENT WHEN CHOSE OPTION DELETE:
  const onDelete = useCallback(() => {
    const currentData = [...data];
    const newData = currentData
      .filter((val) => val.id !== id)
      .map((val, index) => {
        val.id = index;
        return val;
      });
    handleChange(newData);
  }, [data, handleChange, id]);

  //   EVENT WHEN SUBMIT DIALOG INPUT LINK IMAGE:
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
        const currentData = [...data];
        const newData = currentData.map((val) => {
          if (val.id === id) {
            val.content = imageUrl;
          }
          return val;
        });
        handleChange(newData);
      })
      .catch((error) => {
        showAlertError(
          "Lỗi !",
          `Lỗi xảy ra khi kiểm tra liên kết hình ảnh: ${error}`
        );
      });
  }, [data, handleChange, id]);

  //   DEFINE CONTENT OPTION:
  const Options = useMemo(
    () => [
      {
        id: 1,
        icon: <Label />,
        text: "Văn bản",
        onClick: () => handleChangeType(CONTENT_TYPE.TEXT),
      },
      {
        id: 2,
        icon: <InsertPhoto />,
        text: "Hình ảnh",
        onClick: () => handleChangeType(CONTENT_TYPE.IMAGE),
      },
      { id: 3, icon: <DeleteForever />, text: "Xóa", onClick: onDelete },
    ],
    [handleChangeType, onDelete]
  );

  //   DEFINE OPTIONS COMPONENT:
  const OptionComponent = useCallback(
    () =>
      Options.map((val) => (
        <Option key={val.id} onClick={val.onClick} disableRipple>
          <Grid item container alignItems={"center"}>
            <Grid
              item
              container
              xs={"auto"}
              sx={{
                mr: "10px",
                alignItems: "center",
                ".MuiSvgIcon-root": {
                  color: COLOR_PALLETTE.PRIMARY,
                },
              }}
            >
              {val.icon}
            </Grid>
            <Grid item>
              <Typography paddingTop={"2px"} textTransform={"none"}>
                {val.text}
              </Typography>
            </Grid>
          </Grid>
        </Option>
      )),
    [Options]
  );

  return (
    <Container item xs={12}>
      <Grid item container xs={12} columnSpacing={"8px"}>
        <Grid item display="none">
          <TextField
            type="file"
            fullWidth
            label="Hình ảnh"
            placeholder="Nhập url.."
            InputLabelProps={{
              shrink: true,
            }}
            inputRef={fileInputRef}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs>
          {fieldData ? (
            <ButtonPreviewImage fullWidth onClick={handleOpenDialog}>
              <BoxImage src={fieldData} />
            </ButtonPreviewImage>
          ) : (
            <ButtonSelectImage
              fullWidth
              variant="outlined"
              onClick={handleOpenDialog}
            >
              <Grid
                item
                container
                alignItems={"center"}
                justifyContent={"center"}
                columnGap={"8px"}
              >
                <Typography textTransform={"none"}>Chọn ảnh</Typography>
                <ImageOutlined />
              </Grid>
            </ButtonSelectImage>
          )}
        </Grid>
        <Grid item>
          <ButtonHandle onClick={handleOpenMenu}>
            <Grid
              item
              container
              height={1}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <MenuIcon sx={{ color: COLOR_PALLETTE.WHITE }} />
            </Grid>
          </ButtonHandle>
          <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
            {OptionComponent()}
          </Menu>
        </Grid>
      </Grid>
      <DialogSelectImage
        open={openDialog}
        onClose={handleCloseDialog}
        inputRef={fileInputLinkRef}
        onSubmit={onClickSubmitLink}
        openSelectFile={onClickOpenSelectFile}
      />
    </Container>
  );
};

const Container = styled(Grid)({
  position: "relative",
  marginBottom: "24px",
  "&:hover": {
    borderColor: COLOR_PALLETTE.PRIMARY,
  },
});

const ButtonSelectImage = styled(Button)({
  borderStyle: "dashed",
  aspectRatio: "9/5",
});

const ButtonPreviewImage = styled(Button)({
  padding: "0",
  borderRadius: "4px",
  overflow: "hidden",
});

const ButtonHandle = styled(Button)({
  width: "100%",
  height: "100%",
  minWidth: 0,
  background: `${COLOR_PALLETTE.PRIMARY} !important`,
  "&:hover": {
    opacity: "0.7",
  },
});

const Option = styled(MenuItem)({
  minWidth: "200px",
});
