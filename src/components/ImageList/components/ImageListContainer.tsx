import { BoxImage } from "src/UI";
import { FormInputImage, FormTitleWithCheckBox } from "src/components/Form";
import { COLOR_PALLETTE } from "src/constants/color";
import { FormTitleCheckBoxProps, ItemImageListProps } from "src/types";
import { Box, Grid, IconButton, styled } from "@mui/material";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";

const imageListValue = [
  {
    id: 1,
    active: false,
    url: "https://cdn.discordapp.com/attachments/1089123119668658206/1112293025171898478/01-Fansipan-3-1024x576.jpg",
  },
  {
    id: 2,
    active: false,
    url: "https://cdn.discordapp.com/attachments/1089123119668658206/1112293025171898478/01-Fansipan-3-1024x576.jpg",
  },
  {
    id: 3,
    active: false,
    url: "https://cdn.discordapp.com/attachments/1089123119668658206/1112293025171898478/01-Fansipan-3-1024x576.jpg",
  },
  {
    id: 4,
    active: false,
    url: "https://cdn.discordapp.com/attachments/1089123119668658206/1112293025171898478/01-Fansipan-3-1024x576.jpg",
  },
  {
    id: 5,
    active: false,
    url: "https://cdn.discordapp.com/attachments/1089123119668658206/1112293025171898478/01-Fansipan-3-1024x576.jpg",
  },
] as ItemImageListProps[];

export const ImageListContainer = () => {
  const [imageList, setImageList] =
    useState<ItemImageListProps[]>(imageListValue);
  const [isEditMode, setIsEditMode] = useState(false);
  const methods = useForm<FormTitleCheckBoxProps>({
    defaultValues: {
      formTitleCheckBoxValue: false,
    },
  });

  const handleDeleteImageItem = useCallback(() => {
    const data = imageList.filter((val) => !val.active);
    setImageList(data);
  }, [imageList]);

  const resetImageActive = useCallback(() => {
    imageList.map((val) => {
      val.active = false;
      return val;
    }, []);
  }, [imageList]);

  const handleToggleEditMode = useCallback(() => {
    setIsEditMode((pre) => {
      if (pre) {
        resetImageActive();
      }
      return !pre;
    });
  }, [resetImageActive]);

  const handleSetListImageEdit = useCallback(
    (id: string | number) => {
      if (!isEditMode) return;
      const curData = [...imageList];
      const data = curData.map((val) => {
        if (val.id === id) {
          val.active = !val.active;
        }
        return val;
      });
      setImageList(data);
    },
    [imageList, isEditMode]
  );

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
          onClick={() => handleSetListImageEdit(val.id)}
        >
          <CardItemImage
            width={1}
            height={1}
            className={isActive ? "active" : undefined}
          >
            <BoxChecked display={isActive ? undefined : "none"}>
              <CheckBoxIcon sx={{ color: COLOR_PALLETTE.PRIMARY }} />
            </BoxChecked>
            <BoxImage src={val.url} />
          </CardItemImage>
        </CardItem>
      );
    });
  }, [handleSetListImageEdit, imageList]);

  return (
    <FormProvider {...methods}>
      <Container item xs={12}>
        <Header item container alignItems={"center"} xs={12}>
          <Grid item xs>
            <FormTitleWithCheckBox
              title={"Fansipan"}
              checkBoxLabel={"Sửa"}
              value={isEditMode}
              onChange={handleToggleEditMode}
            />
          </Grid>
          {isEditMode && (
            <Grid item xs="auto">
              <IconButton color="error">
                <DeleteForeverSharpIcon onClick={handleDeleteImageItem} />
              </IconButton>
            </Grid>
          )}
        </Header>
        <CardContainer item container xs={12} mt="20px">
          <CardItem item xs={6} md={4} lg={3} xl={12 / 5}>
            <FormInputImage name={"form_upload_image"} />
          </CardItem>
          {imageListComponent()}
        </CardContainer>
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
