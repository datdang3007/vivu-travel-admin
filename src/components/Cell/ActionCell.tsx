import { Button, Grid, Typography } from "@mui/material";
import { useCallback } from "react";
import { MuiTableCellProps } from "src/types/MuiTable";

export function ActionCell<T extends Record<string, any>>({
  cell,
}: MuiTableCellProps<T>) {
  const cellId = cell?.row.original.id;

  const onClickBlock = useCallback(() => {
    console.log("block user", cellId);
  }, [cellId]);

  return (
    <Grid item xs={12} height={1} container alignItems={"center"}>
      <Button onClick={onClickBlock} color="error">
        <Typography textTransform={"none"}>Chặn</Typography>
      </Button>
    </Grid>
  );
}
