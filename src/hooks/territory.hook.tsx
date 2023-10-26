import { Grid } from "@mui/material";
import { useCallback } from "react";
import { CardItem } from "src/UI";
import { ITerritory } from "src/interfaces";
import { useCallApi } from "./common.hook";

export const useTerritoryHook = () => {
  const { territoryList } = useCallApi();

  const renderCardComponent = useCallback(
    () =>
      territoryList.map((val: ITerritory) => (
        <Grid key={val.id} item sm={12} md={6} xl={4} padding={"15px"}>
          {/* <CardItem name={val.name} slogan={val.slogan} img={val.image} /> */}
        </Grid>
      )),
    [territoryList]
  );

  return { renderCardComponent };
};
