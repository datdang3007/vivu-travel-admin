import { FormTitle } from "src/components/Form";
import { Grid, styled } from "@mui/material";
import { UserList } from "./UserList";
import { COLOR_PALLETTE } from "src/constants/color";

export const UserManagerContainer = () => {
  return (
    <Container item xs={12}>
      <Grid item xs={12}>
        <FormTitle title="Quản Lý Người Dùng">
          <Grid item xs={12} mt={"40px"}>
            <UserList />
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
