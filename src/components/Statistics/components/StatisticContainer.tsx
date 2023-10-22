import { Card, Grid } from "@mui/material";
import { PieChart } from "@mui/x-charts";

export const StatisticContainer = () => {
  return (
    <Grid item xs={12}>
      <Card>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: "series A" },
                { id: 1, value: 15, label: "series B" },
                { id: 2, value: 20, label: "series C" },
              ],
            },
          ]}
          width={350}
          height={200}
        />
      </Card>
    </Grid>
  );
};
