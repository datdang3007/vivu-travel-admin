import { Box, Grid } from "@mui/material";
import {
  MRT_Cell,
  MRT_Column,
  MRT_Row,
  MRT_TableInstance,
} from "material-react-table";
import { ReactNode } from "react";
import { BoxImage } from "src/UI";

type Props<T extends Record<string, any>> = {
  cell: MRT_Cell<T>;
  renderedCellValue: number | string | ReactNode;
  column: MRT_Column<T>;
  row: MRT_Row<T>;
  table: MRT_TableInstance<T>;
};

export function ImageCell<T extends Record<string, any>>({
  cell,
}: Props<T>) {
  const image = (cell?.getValue() ?? "") as string;

  return (
    <Grid item xs={12} height={1} container alignItems={"center"}>
      <Box width={"120px"} height={"100px"}>
        <BoxImage src={image} />
      </Box>
    </Grid>
  );
}
