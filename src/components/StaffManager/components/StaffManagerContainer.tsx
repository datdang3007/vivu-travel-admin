import { FormTitle } from "src/components/Form";
import { Grid, styled } from "@mui/material";
import { StaffList } from "./StaffList";
import { COLOR_PALLETTE } from "src/constants/color";

export const StaffManagerContainer = () => {
  return (
    <Container item xs={12}>
      <Grid item xs={12}>
        <FormTitle title="Quản Lý Quản Trị Viên">
          <Grid item xs={12} mt={"40px"}>
            <StaffList />
          </Grid>
        </FormTitle>
      </Grid>
    </Container>
  );
};

const Container = styled(Grid)({
  margin: "25px 25px",
  padding: "25px",
  maxHeight: "calc(100vh - 50px)",
  background: COLOR_PALLETTE.WHITE,
  boxShadow: `rgba(0, 0, 0, 0.16) 0px 1px 4px`,
});
