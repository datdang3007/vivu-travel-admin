import { Button, Grid, Typography, styled } from "@mui/material";
import { KeyboardBackspace } from "@mui/icons-material";
import { FormProvider } from "react-hook-form";
import {
  FormTextArea,
  FormTitle,
  FormUploadImage,
  InputTextField,
} from "src/components/Form";
import { COLOR_PALLETTE } from "src/constants/color";
import { useProvinceEditHook } from "src/hooks";

export const ProvinceEditComponent = () => {
  const { formCreate, onSubmit, onClickBackToList, territoryOptionComponent } =
    useProvinceEditHook();

  return (
    <Container item xs={12}>
      <Grid item xs={12}>
        <Button startIcon={<KeyboardBackspace />} onClick={onClickBackToList}>
          <Typography textTransform={"none"}>Trở lại</Typography>
        </Button>
        <FormTitle title="Sửa Tỉnh Thành">
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
                <InputTextField
                  name="name"
                  fullWidth
                  label="Tên"
                  placeholder="Nhập tên tỉnh thành"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    maxLength: 255,
                  }}
                  rules={{
                    required: "Giá trị không được để trống",
                  }}
                />
              </Grid>
              <Grid container justifyContent={"space-between"} rowGap={"24px"}>
                <Grid item xs={12}>
                  <InputTextField
                    name="territory"
                    fullWidth
                    select
                    label="Vùng"
                    InputLabelProps={{ shrink: true }}
                    rules={{
                      required: "Giá trị không được để trống",
                    }}
                  >
                    {territoryOptionComponent()}
                  </InputTextField>
                </Grid>
              </Grid>
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
              <Grid item xs={12}>
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
                    <Typography textTransform={"none"}>Sửa</Typography>
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
