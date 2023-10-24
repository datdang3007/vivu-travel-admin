import { Box, Grid } from "@mui/material";
import { BoxImage } from "src/UI";
import { MuiTableCellProps } from "src/types/MuiTable";

export function ImageCell<T extends Record<string, any>>({
  cell,
}: MuiTableCellProps<T>) {
  const image = (cell?.getValue() ?? "") as string;

  return (
    <Grid item xs={12} height={1} container alignItems={"center"}>
      <Box width={"120px"} height={"100px"}>
        <BoxImage src={image} />
      </Box>
    </Grid>
  );
}
