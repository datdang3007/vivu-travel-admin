import AddIcon from "@mui/icons-material/Add";
import { Button, Grid, Typography, styled } from "@mui/material";
import { FormTitleWithButton } from "src/components/Form";
import { COLOR_PALLETTE } from "src/constants/color";
import { useRegionHook } from "src/hooks";

export const RegionContainer = () => {
  const { renderCardComponent } = useRegionHook();

  return (
    <Container item xs={12}>
      <Header item xs={12}>
        <FormTitleWithButton
          title={"Miền"}
          buttonComponent={
            <ButtonCreate color="success" variant="contained">
              <Grid item container>
                <AddIcon />
                <Typography textTransform={"none"}>Thêm</Typography>
              </Grid>
            </ButtonCreate>
          }
        />
      </Header>
      <CardContainer item container xs={12}>
        {renderCardComponent()}
      </CardContainer>
    </Container>
  );
};

const Container = styled(Grid)({
  margin: "25px 25px",
  maxHeight: "calc(100vh - 50px)",
});

const Header = styled(Grid)({
  background: COLOR_PALLETTE.WHITE,
  padding: "15px 25px",
  boxShadow: `rgba(0, 0, 0, 0.16) 0px 1px 4px`,
});

const ButtonCreate = styled(Button)({});

const CardContainer = styled(Grid)({
  overflowX: "hidden",
  overflowY: "auto",
  marginTop: "20px",
  maxHeight: "calc(100vh - 150.5px)",
});
