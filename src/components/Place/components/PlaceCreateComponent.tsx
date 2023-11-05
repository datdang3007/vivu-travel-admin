import { ExpandMore, KeyboardBackspace } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import { FormProvider } from "react-hook-form";
import { ContentEditor } from "src/components/ContentEditor";
import {
  FormAutoComplete,
  FormTextArea,
  FormTitle,
  FormUploadImage,
  InputTextField,
} from "src/components/Form";
import { COLOR_PALLETTE } from "src/constants/color";
import { usePlaceCreateHook } from "src/hooks/place.hook";

export const PlaceCreateComponent = () => {
  const {
    PageList,
    formCreate,
    contentData,
    onSubmit,
    placeCategoryOptions,
    handleUpdateContentData,
    provinceOptionComponent,
  } = usePlaceCreateHook();

  return (
    <Container item xs={12}>
      <Grid item xs={12}>
        <Button startIcon={<KeyboardBackspace />} onClick={PageList}>
          <Typography textTransform={"none"}>Trở lại</Typography>
        </Button>
        <FormTitle title="Tạo Địa Điểm Mới">
          <FormProvider {...formCreate}>
            <Grid
              item
              container
              xs={12}
              component={"form"}
              mt={"40px"}
              rowGap={"24px"}
              onSubmit={onSubmit}
            >
              <Grid item xs={12}>
                <Title>Ảnh đại diện</Title>
              </Grid>

              <Grid item container xs={12}>
                {/* IMAGE */}
                <FormUploadImage
                  name="image"
                  fullWidth
                  label="Hình ảnh"
                  InputLabelProps={{ shrink: true }}
                  rules={{
                    required: "Giá trị không được để trống",
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Title>Thông tin chung</Title>
              </Grid>

              {/* NAME */}
              <Grid item xs={12}>
                <InputTextField
                  name="name"
                  fullWidth
                  label="Tên"
                  placeholder="Nhập tên địa điểm"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    maxLength: 255,
                  }}
                  rules={{
                    required: "Giá trị không được để trống",
                  }}
                />
              </Grid>

              {/* PROVINCE */}
              <Grid container justifyContent={"space-between"} rowGap={"24px"}>
                <Grid item xs={12}>
                  <InputTextField
                    name="province"
                    fullWidth
                    select
                    label="Tỉnh Thành"
                    InputLabelProps={{ shrink: true }}
                    rules={{
                      required: "Giá trị không được để trống",
                    }}
                  >
                    {provinceOptionComponent()}
                  </InputTextField>
                </Grid>
              </Grid>

              {/* CATEGORY */}
              <Grid container justifyContent={"space-between"} rowGap={"24px"}>
                <Grid item xs={12}>
                  <FormAutoComplete
                    name="category"
                    fullWidth
                    label="Loại hình du lịch"
                    placeholder="Vui lòng chọn"
                    InputLabelProps={{ shrink: true }}
                    items={placeCategoryOptions}
                    rules={{
                      required: "Giá trị không được để trống",
                    }}
                  />
                </Grid>
              </Grid>

              {/* OVERVIEW */}
              <Grid item xs={12}>
                <FormTextArea
                  name="overview"
                  fullWidth
                  label="Tổng quan"
                  placeholder="Nhập tổng quan"
                  InputLabelProps={{ shrink: true }}
                  rules={{
                    required: "Giá trị không được để trống",
                  }}
                />
              </Grid>

              {/* CONTENTS */}
              <Grid item xs={12}>
                <Accordion defaultExpanded={true}>
                  <CustomAccordionSummary expandIcon={<ExpandMore />}>
                    <Grid item xs={12}>
                      <Title>Nội dung</Title>
                    </Grid>
                  </CustomAccordionSummary>
                  <AccordionDetails>
                    <Grid
                      item
                      container
                      justifyContent={"center"}
                      xs={12}
                      rowGap={"24px"}
                      sx={{
                        padding: "0 20px 36px",
                      }}
                    >
                      <ContentEditor
                        contentData={contentData}
                        setContentData={handleUpdateContentData}
                      />
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>

              {/* BUTTON ACTIONS */}
              <Grid container columnGap={"12px"}>
                <Grid item xs={"auto"}>
                  <Button
                    size="large"
                    variant="contained"
                    color="success"
                    type="submit"
                    sx={{
                      width: "140px",
                    }}
                  >
                    <Typography textTransform={"none"}>Tạo</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </FormProvider>
        </FormTitle>
      </Grid>
    </Container>
  );
};

const Container = styled(Grid)({
  margin: "25px 25px",
  padding: "25px",
  background: COLOR_PALLETTE.WHITE,
  boxShadow: `rgba(0, 0, 0, 0.16) 0px 1px 4px`,
});

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  [theme.breakpoints.up("md")]: {
    fontSize: 24,
  },
  [theme.breakpoints.up("md")]: {
    fontSize: 20,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 16,
  },
}));

const CustomAccordionSummary = styled(AccordionSummary)({
  padding: "0 20px",
});
