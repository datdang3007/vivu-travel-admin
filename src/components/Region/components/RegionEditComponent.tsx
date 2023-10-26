import { KeyboardBackspace } from "@mui/icons-material";
import { Button, Grid, Typography, styled } from "@mui/material";
import { FormProvider } from "react-hook-form";
import {
  FormTextArea,
  FormTitle,
  FormUploadImage,
  InputTextField,
} from "src/components/Form";
import { COLOR_PALLETTE } from "src/constants/color";
import { useRegionEditHook } from "src/hooks";

export const RegionEditComponent = () => {
  const { formEdit, PageList, onSubmit } = useRegionEditHook();

  return (
    <Container item xs={12}>
      <Grid item xs={12}>
        <Button startIcon={<KeyboardBackspace />} onClick={PageList}>
          <Typography textTransform={"none"}>Trở lại</Typography>
        </Button>
        <FormTitle title="Sửa Miền">
          <FormProvider {...formEdit}>
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
                  placeholder="Nhập tên miền"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    maxLength: 255,
                  }}
                  rules={{
                    required: "Giá trị không được để trống",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputTextField
                  name="slogan"
                  fullWidth
                  label="Khẩu hiệu"
                  placeholder="Nhập khẩu hiệu"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    maxLength: 255,
                  }}
                  rules={{
                    required: "Giá trị không được để trống",
                  }}
                />
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
