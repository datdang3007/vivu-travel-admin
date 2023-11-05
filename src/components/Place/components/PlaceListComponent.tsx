import { FormTitleWithButton } from "src/components/Form";
import { Button, Grid, Typography, styled } from "@mui/material";
import { COLOR_PALLETTE } from "src/constants/color";
import { Add, Label } from "@mui/icons-material";
import MaterialReactTable from "material-react-table";
import { MRT_Localization_VI } from "material-react-table/locales/vi";
import { usePlaceListHook } from "src/hooks/place.hook";
import { DialogPlaceCategory } from "src/components/Dialog";

export const PlaceListComponent = () => {
  const {
    placeData,
    columns,
    PageCreate,
    placeCategoryData,
    setPlaceCategoryData,
    openDialogPlaceCategory,
    currentPlaceCategoryData,
    handleUpdatePlaceCategory,
    handleOpenDialogPlaceCategory,
    handleCloseDialogPlaceCategory,
  } = usePlaceListHook();

  return (
    <Container item xs={12}>
      <Grid item xs={12}>
        <FormTitleWithButton
          title={"Địa Điểm"}
          buttonComponent={
            <Grid item container xs={"auto"} columnGap={"12px"}>
              <ButtonCreate
                variant="contained"
                startIcon={
                  <Label
                    sx={{
                      fontSize: "16px !important",
                    }}
                  />
                }
                onClick={handleOpenDialogPlaceCategory}
              >
                <Typography textTransform={"none"}>
                  Loại hình du lịch
                </Typography>
              </ButtonCreate>
              <ButtonCreate
                color="success"
                variant="contained"
                startIcon={<Add />}
                onClick={PageCreate}
              >
                <Typography textTransform={"none"}>Thêm</Typography>
              </ButtonCreate>
            </Grid>
          }
        >
          <DialogPlaceCategory
            data={placeCategoryData}
            setData={setPlaceCategoryData}
            open={openDialogPlaceCategory}
            onSubmit={handleUpdatePlaceCategory}
            currentData={currentPlaceCategoryData}
            onClose={handleCloseDialogPlaceCategory}
          />
          <Grid item xs={12} mt={"40px"}>
            <MaterialReactTable
              columns={columns}
              data={placeData}
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
