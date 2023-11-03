import {
  Button,
  Grid,
  Menu,
  MenuItem,
  Typography,
  styled,
} from "@mui/material";
import { Label, Add, InsertPhoto } from "@mui/icons-material";
import { useCallback, useMemo, useState } from "react";
import { CONTENT_TYPE } from "src/constants/content";
import { COLOR_PALLETTE } from "src/constants/color";
import { ContentDataProps } from "src/types";

type Props = {
  data: any[];
  setData: (data: ContentDataProps[]) => void;
};

export const NewBox = (props: Props) => {
  const { data, setData } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // OPEN / CLOSE MENU:
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // EVENT DROPDOWN CLICK:
  const handleAddNewData = useCallback(
    (type: number) => {
      const convertData = {
        id: data.length + 1,
        type: type,
        content: "",
      };
      const newData = [...data, { ...convertData }] as ContentDataProps[];
      setData(newData);
      handleCloseMenu();
    },
    [data, setData]
  );

  //   DEFINE CONTENT OPTION:
  const Options = useMemo(
    () => [
      {
        id: 1,
        icon: <Label />,
        text: "Văn bản",
        onClick: () => handleAddNewData(CONTENT_TYPE.TEXT),
      },
      {
        id: 2,
        icon: <InsertPhoto />,
        text: "Hình ảnh",
        onClick: () => handleAddNewData(CONTENT_TYPE.IMAGE),
      },
    ],
    [handleAddNewData]
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
    <Grid item xs={12}>
      <ButtonNew variant="outlined" fullWidth onClick={handleOpenMenu}>
        <Grid item container alignItems={"center"} justifyContent={"center"}>
          <Grid item container alignItems={"center"} xs={"auto"} mr={"5px"}>
            <Add />
          </Grid>
          <Grid item>
            <Typography paddingTop={"2px"} textTransform={"none"}>
              Thêm
            </Typography>
          </Grid>
        </Grid>
      </ButtonNew>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {OptionComponent()}
      </Menu>
    </Grid>
  );
};

const ButtonNew = styled(Button)({
  borderStyle: "dashed !important",
  padding: "15px",
});

const Option = styled(MenuItem)({
  minWidth: "200px",
});
