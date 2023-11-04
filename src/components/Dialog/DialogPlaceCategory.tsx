import { Add, Edit, Clear } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { COLOR_PALLETTE } from "src/constants/color";

type Props = {
  data: any[];
  currentData: any[];
  setData: (data: any[]) => void;
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

export const DialogPlaceCategory = (props: Props) => {
  const { data, currentData, setData, open, onClose, onSubmit } = props;
  const [editMode, setEditMode] = useState<boolean>(false);

  // Check has any item selected:
  const isAlreadySelection = useMemo(() => {
    return data.length > 0 && !!data.filter((val) => val.selected).length;
  }, [data]);

  // Check is select all the item:
  const isSelectAll = useMemo(() => {
    return data.length > 0 && !data.filter((val) => !val.selected).length;
  }, [data]);

  // Event set all the data to selected or not:
  const setDataSelection = useCallback(
    (bool: boolean) => {
      const newData = data.map((val) => {
        val.selected = bool;
        return val;
      });
      setData(newData);
    },
    [data, setData]
  );

  // Event when click button create:
  const onClickCreate = useCallback(() => {
    const initData = {
      id: `new_category_${data.length}`,
      name: "Loại địa điểm mới",
      selected: false,
    };
    const newData = [
      ...data.map((val) => {
        val.selected = false;
        return val;
      }),
      initData,
    ];
    setData(newData);
    setEditMode(true);
  }, [data, setData]);

  // Event when click button edit:
  const onClickEdit = useCallback(() => {
    if (!data.length) return;
    if (!editMode) setDataSelection(false);
    setEditMode((pre) => !pre);
  }, [data, editMode, setDataSelection]);

  // Event when click item select all:
  const onClickSelectAll = useCallback(() => {
    if (!data.length || editMode) return;
    setDataSelection(!isSelectAll);
  }, [data, editMode, isSelectAll, setDataSelection]);

  // Event when click button delete:
  const onClickButtonDelete = useCallback(() => {
    if (!data.length) return;
    const newData = data.filter((val) => !val.selected);
    setData(newData);
  }, [data, setData]);

  // Event change item selection:
  const onClickItem = useCallback(
    (index: number) => {
      const newData = [...data];
      newData[index].selected = !newData[index].selected;
      setData(newData);
    },
    [data, setData]
  );

  // Event handle data when text field onBlur:
  const handleChangeData = useCallback(
    (event: any, index: number) => {
      const newValue = event.target.value;
      const newData = [...data];
      newData[index].name = newValue;
      setData(newData);
    },
    [data, setData]
  );

  // Component categories:
  const renderListCategoryComponent = useCallback(() => {
    // If data is empty:
    if (!data.length) {
      return (
        <Grid
          container
          paddingTop={"75px"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography
            sx={{
              fontStyle: "italic",
              color: COLOR_PALLETTE.DARK_GRAY,
            }}
          >
            Không có dữ liệu
          </Typography>
        </Grid>
      );
    }

    // If data have value:
    return data.map((category, index) => {
      return (
        <ListItem key={category.id} disablePadding>
          <ListItemButton
            dense
            sx={{
              minHeight: "50px",
              "&.Mui-focusVisible": {
                background: "rgba(0,0,0, .06) !important",
              },
            }}
            onClick={editMode ? undefined : () => onClickItem(index)}
            selected={category.selected}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                disableRipple
                disabled={editMode}
                checked={category.selected}
              />
            </ListItemIcon>
            <ListItemText
              id={category.id}
              primary={
                editMode ? (
                  <TextField
                    variant="standard"
                    fullWidth
                    autoFocus={isNaN(category.id)}
                    defaultValue={category.name}
                    onBlur={(event) => handleChangeData(event, index)}
                  />
                ) : (
                  <Typography fontSize={"16px"}>{category.name}</Typography>
                )
              }
            />
          </ListItemButton>
        </ListItem>
      );
    });
  }, [data, editMode, handleChangeData, onClickItem]);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setData([...currentData]);
      }, 350);
    }
  }, [currentData, open, setData]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={"sm"}>
      <DialogTitle>
        <Grid container alignItems={"center"} justifyContent={"space-between"}>
          <Grid item xs={"auto"}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: {
                  xs: 15,
                  sm: 18,
                  md: 20,
                },
              }}
            >
              Phân Loại Địa Điểm
            </Typography>
          </Grid>
          <Grid item container columnGap={"8px"} xs={"auto"}>
            {/* Button Edit */}
            <Tooltip title="Sửa">
              <IconButton color="primary" onClick={onClickEdit}>
                <Edit
                  sx={{
                    width: "24px",
                    fontSize: "18px",
                  }}
                />
              </IconButton>
            </Tooltip>

            {/* Button Create */}
            <Tooltip title="Thêm">
              <IconButton color="success" onClick={onClickCreate}>
                <Add />
              </IconButton>
            </Tooltip>

            {/* Button Delete */}
            <Tooltip title="Xóa">
              <IconButton
                disabled={!isAlreadySelection}
                color="error"
                onClick={onClickButtonDelete}
              >
                <Clear />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent dividers>
        <List sx={{ width: "100%" }}>
          <ListItemButton
            dense
            disabled={!data.length}
            selected={isSelectAll}
            onClick={onClickSelectAll}
            sx={{
              minHeight: "50px",
              "&.Mui-focusVisible": {
                background: "rgba(0,0,0, .06) !important",
              },
            }}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                disableRipple
                disabled={editMode}
                checked={isSelectAll}
                indeterminate={isAlreadySelection && !isSelectAll}
              />
            </ListItemIcon>
            <ListItemText
              primary={<Typography fontSize={"16px"}>Chọn tất cả</Typography>}
            />
          </ListItemButton>
        </List>
        <Divider />
        <List sx={{ width: "100%", minHeight: "150px" }}>
          {renderListCategoryComponent()}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          <Typography textTransform={"none"}>Đóng</Typography>
        </Button>
        <Button variant="contained" onClick={onSubmit}>
          <Typography textTransform={"none"}>Lưu</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
