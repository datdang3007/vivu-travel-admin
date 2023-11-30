import { RemoveCircle } from "@mui/icons-material";
import { Grid, IconButton, Tooltip } from "@mui/material";
import { useCallback } from "react";
import { MuiTableCellProps } from "src/types/MuiTable";

type Props = {
  onRemove?: (id: string) => void;
};

export function StaffActionCell<T extends Record<string, any>>({
  onRemove,
}: Props) {
  return function Cell({ row }: MuiTableCellProps<T>) {
    const id = row.original.id;

    const onClickButtonRemove = useCallback(() => {
      if (onRemove) {
        onRemove(id);
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
        <Tooltip title="Thu hồi vai trò">
          <IconButton color="error" onClick={onClickButtonRemove}>
            <RemoveCircle />
          </IconButton>
        </Tooltip>
      </Grid>
    );
  };
}
