import { DeleteForever, Edit, Visibility } from "@mui/icons-material";
import { Grid, IconButton, Tooltip } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MuiTableCellProps } from "src/types/MuiTable";
import { showAlertConfirm } from "src/utils/alert";

type Props = {
  path?: string;
  onDelete?: (id: string) => void;
};

export function ActionCell<T extends Record<string, any>>({
  path,
  onDelete,
}: Props) {
  return function Cell({ row }: MuiTableCellProps<T>) {
    const id = row.original.id;
    const navigate = useNavigate();

    const changeToEdit = useCallback(() => {
      navigate(`${path}/edit/${id}`);
    }, [id, navigate]);

    const onClickButtonDelete = useCallback(() => {
      if (onDelete) {
        showAlertConfirm("Xác nhận", "Bạn chắc chắn muốn xóa chứ ?", 'Đồng ý').then(
          (res) => {
            if (res.isConfirmed) {
              onDelete(id);
            }
          }
        );
      }
    }, [id]);

    return (
      <Grid
        item
        xs={12}
        height={1}
        container
        alignItems={"center"}
        columnGap={"8px"}
      >
        <Tooltip title="Sửa">
          <IconButton onClick={changeToEdit} color="success">
            <Edit />
          </IconButton>
        </Tooltip>

        <Tooltip title="Chi tiết">
          <IconButton color="info">
            <Visibility />
          </IconButton>
        </Tooltip>

        <Tooltip title="Xóa">
          <IconButton color="error" onClick={onClickButtonDelete}>
            <DeleteForever />
          </IconButton>
        </Tooltip>
      </Grid>
    );
  };
}
