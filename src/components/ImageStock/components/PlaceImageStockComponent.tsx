import { DeleteForeverSharp, CheckBox, Add } from "@mui/icons-material";
import { Box, Button, Grid, Typography, styled } from "@mui/material";
import { useCallback } from "react";
import { FormProvider } from "react-hook-form";
import { BoxImage } from "src/UI";
import { DialogPreviewImage, DialogSelectImage } from "src/components/Dialog";
import { FormInputImage, FormTitleWithCheckBox } from "src/components/Form";
import { COLOR_PALLETTE } from "src/constants/color";
import { usePlaceImageStockHook } from "src/hooks/image-stock.hook";

export const PlaceImageStockComponent = () => {
  const {
    imageList,
    placeName,
    methods,
    isEditMode,
    imagePreview,
    fileInputLinkRef,
    openDialogSelectImage,
    handleOpenDialogSelectImage,
    handleCloseDialogSelectImage,
    onClickSubmitLink,
    handleCreateImage,
    handleToggleEditMode,
    handleDeleteImage,
    onCloseDialogPreview,
    onImageClick,
  } = usePlaceImageStockHook();

  const imageListComponent = useCallback(() => {
    return imageList.map((val) => {
      const isActive = val.active;
      return (
        <CardItem
          key={val.id}
          item
          xs={6}
          md={4}
          lg={3}
          xl={12 / 5}
          onClick={() => onImageClick(val.id, val.link)}
        >
          <CardItemImage
            width={1}
            height={1}
            className={isActive ? "active" : undefined}
          >
            <BoxChecked display={isActive ? undefined : "none"}>
              <CheckBox sx={{ color: COLOR_PALLETTE.PRIMARY }} />
            </BoxChecked>
            <BoxImage src={val.link} />
          </CardItemImage>
        </CardItem>
      );
    });
  }, [imageList, onImageClick]);

  return (
    <FormProvider {...methods}>
      <Container item xs={12}>
        <Header item container alignItems={"center"} xs={12}>
          <Grid item xs>
            <FormTitleWithCheckBox
              title={`Kho ảnh địa điểm ${placeName}`}
              checkBoxLabel={"Sửa"}
              value={isEditMode}
              onChange={handleToggleEditMode}
            />
          </Grid>

          {/* Button Delete */}
          <Grid item xs="auto">
            <Button
              color="error"
              disabled={!isEditMode}
              onClick={handleDeleteImage}
              endIcon={<DeleteForeverSharp />}
            >
              <Typography textTransform={"none"}>Xóa</Typography>
            </Button>
          </Grid>

          {/* Button Add Image */}
          <Grid item xs="auto">
            <Button
              color="success"
              onClick={handleOpenDialogSelectImage}
              endIcon={<Add />}
            >
              <Typography textTransform={"none"}>Thêm ảnh</Typography>
            </Button>
          </Grid>
        </Header>
        <CardContainer item container xs={12} mt="20px">
          <CardItem item xs={6} md={4} lg={3} xl={12 / 5}>
            <FormInputImage
              name={"form_upload_image"}
              createImage={handleCreateImage}
            />
          </CardItem>
          {imageListComponent()}
        </CardContainer>

        {/* Dialog List */}
        <DialogPreviewImage
          url={imagePreview}
          open={!!imagePreview}
          onClose={onCloseDialogPreview}
        />

        <DialogSelectImage
          open={openDialogSelectImage}
          onClose={handleCloseDialogSelectImage}
          inputRef={fileInputLinkRef}
          onSubmit={onClickSubmitLink}
        />
      </Container>
    </FormProvider>
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

const CardContainer = styled(Grid)({
  overflowX: "hidden",
  overflowY: "auto",
  maxHeight: "calc(100vh - 150.5px)",
});

const CardItem = styled(Grid)({
  padding: "15px",
  height: "280px",
});

const BoxChecked = styled(Box)({
  position: "absolute",
  top: "5px",
  left: "5px",
});

const CardItemImage = styled(Box)({
  cursor: "pointer",
  position: "relative",
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  borderRadius: "4px",
  overflow: "hidden",
  "&.active": {
    border: `2px solid ${COLOR_PALLETTE.PRIMARY}`,
  },
});
