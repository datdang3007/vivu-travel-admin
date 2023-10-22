import { Button, Grid, Typography } from "@mui/material";
import {
  MRT_Cell,
  MRT_Column,
  MRT_Row,
  MRT_TableInstance,
} from "material-react-table";
import { ReactNode, useCallback } from "react";

type Props<T extends Record<string, any>> = {
  cell: MRT_Cell<T>;
  renderedCellValue: number | string | ReactNode;
  column: MRT_Column<T>;
  row: MRT_Row<T>;
  table: MRT_TableInstance<T>;
};

export function ActionCell<T extends Record<string, any>>({ cell }: Props<T>) {
  const cellId = cell?.row.original.id;

  const onClickDelete = useCallback(() => {
    console.log("delete user", cellId);
  }, [cellId]);

  return (
    <Grid item xs={12} height={1} container alignItems={"center"}>
      <Button onClick={onClickDelete} color="error">
        <Typography textTransform={"none"}>Xóa</Typography>
      </Button>
    </Grid>
  );
}
