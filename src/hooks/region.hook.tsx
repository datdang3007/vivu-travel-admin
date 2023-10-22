import { Grid } from "@mui/material";
import { useCallback } from "react";
import { CardItem } from "src/UI";
import { IRegion } from "src/interfaces";
import { useCallApi } from "./common.hook";

export const useRegionHook = () => {
  const { regionList } = useCallApi();

  const renderCardComponent = useCallback(
    () =>
      regionList.map((val: IRegion) => (
        <Grid key={val.id} item sm={12} md={6} xl={4} padding={"15px"}>
          <CardItem name={val.name} slogan={val.slogan} img={val.image} />
        </Grid>
      )),
    [regionList]
  );

  return { regionList, renderCardComponent };
};
