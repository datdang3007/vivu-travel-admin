import { InsertPhoto, Label, DeleteForever } from "@mui/icons-material";
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
import { useCallback, useMemo, useState } from "react";
import { COLOR_PALLETTE } from "src/constants/color";
import { CONTENT_TYPE } from "src/constants/content";
import { ContentDataProps } from "src/types";

type Props = {
  id: string | number;
  data: any[];
  handleChange: (data: ContentDataProps[]) => void;
};

export const ContentText = (props: Props) => {
  const { id, data, handleChange } = props;
  const fieldData = data.find((val) => val.id === id)?.content;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
      const value = event.target.value;
      const currentData = [...data];
      const newData = currentData.map((val) => {
        if (val.id === id) {
          val.content = value;
        }
        return val;
      });
      handleChange(newData);
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
    <Container
      item
      container
      xs={12}
      justifyContent={"space-between"}
      columnSpacing={"8px"}
    >
      <Grid item xs>
        <TextArea
          fullWidth
          minRows={3}
          multiline
          type="text"
          label="Văn bản"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={fieldData}
          placeholder="Nhập văn bản"
          onChange={onChange}
        />
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

const TextArea = styled(TextField)({
  textarea: {
    minHeight: "23px",
    resize: "vertical",
  },
});
