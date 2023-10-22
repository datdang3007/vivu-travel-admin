import AddIcon from "@mui/icons-material/Add";
import { Button, Grid, Typography, styled } from "@mui/material";
import MaterialReactTable from "material-react-table";
import { MRT_Localization_VI } from "material-react-table/locales/vi";
import { FormTitleWithButton } from "src/components/Form";
import { COLOR_PALLETTE } from "src/constants/color";
import { useProvinceListHook } from "src/hooks";

export const ProvinceListComponent = () => {
  const { PageCreate, columns, provinceData } = useProvinceListHook();

  return (
    <Container item xs={12}>
      <Grid item xs={12}>
        <FormTitleWithButton
          title={"Tỉnh Thành"}
          buttonComponent={
            <ButtonCreate
              color="success"
              variant="contained"
              onClick={PageCreate}
            >
              <Grid item container>
                <AddIcon />
                <Typography textTransform={"none"}>Thêm</Typography>
              </Grid>
            </ButtonCreate>
          }
        >
          <Grid item xs={12} mt={"40px"}>
            <MaterialReactTable
              columns={columns}
              data={provinceData}
              enableStickyHeader
              enableColumnFilters={false}
              localization={MRT_Localization_VI}
              muiTableContainerProps={{
                sx: { height: `calc(100vh - 332.5px)` },
              }}
            />
          </Grid>
        </FormTitleWithButton>
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

const ButtonCreate = styled(Button)({});
