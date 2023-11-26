import { ClearRounded, Check, Visibility } from "@mui/icons-material";
import { Grid, IconButton, Tooltip } from "@mui/material";
import { useCallback } from "react";
import { MuiTableCellProps } from "src/types/MuiTable";
import { showAlertConfirm } from "src/utils/alert";

type Props = {
  onView?: (id: string) => void;
  onApproved?: (id: string) => void;
  onRejected?: (id: string) => void;
};

export function PostActionCell<T extends Record<string, any>>({
  onView,
  onApproved,
  onRejected,
}: Props) {
  return function Cell({ row }: MuiTableCellProps<T>) {
    const id = row.original.id;

    const onClickButtonView = useCallback(() => {
      if (onView) {
        onView(id);
      }
    }, [id]);

    const onClickButtonApproved = useCallback(() => {
      if (onApproved) {
        onApproved(id);
      }
    }, [id]);

    const onClickButtonRejected = useCallback(() => {
      if (onRejected) {
        showAlertConfirm(
          "Xác nhận",
          "Bạn chắc chắn muốn từ chối bài viết này?",
          "Đồng ý"
        ).then((res) => {
          if (res.isConfirmed) {
            onRejected(id);
          }
        });
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
        <Tooltip title="Chi tiết">
          <IconButton onClick={onClickButtonView} color="info">
            <Visibility />
          </IconButton>
        </Tooltip>

        <Tooltip title="Duyệt">
          <IconButton onClick={onClickButtonApproved} color="success">
            <Check />
          </IconButton>
        </Tooltip>

        <Tooltip title="Từ chối">
          <IconButton onClick={onClickButtonRejected} color="error">
            <ClearRounded />
          </IconButton>
        </Tooltip>
      </Grid>
    );
  };
}
