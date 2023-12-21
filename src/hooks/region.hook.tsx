import { Grid } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { CardItem } from "src/UI";
import { IRegion } from "src/interfaces";
import { PATH } from "src/routes/path";
import { showAlertConfirm, showAlertSuccess } from "src/utils/alert";
import { GetIdParams } from "src/utils/common";
import {
  useCallAPICreate,
  useCallAPIDelete,
  useCallAPIFind,
  useCallAPIUpdate,
  useCallApi,
  useNavigateCRUD,
} from "./common.hook";
import { useLoadingContext } from "src/provider/loading.provider";
import { PROCESS_ENV } from "src/constants/env";

const url = PATH.REGION;

// Hook for list page:
export const useRegionListHook = () => {
  const { PageCreate, PageEdit } = useNavigateCRUD(url);
  const { regionList, refetchRegionList, loadingRegionList } = useCallApi();
  const { requestDeleteRegion } = useCallAPIDelete();
  const { setIsLoading } = useLoadingContext();

  // EVENT WHEN CLICK BUTTON VIEW:
  const onView = useCallback((id: string) => {
    window.open(`${PROCESS_ENV.USER_PAGE_URL}/region/${id}`, "_blank");
  }, []);

  // EVENT WHEN CLICK BUTTON DELETE:
  const onDelete = useCallback(
    (id: string) => {
      showAlertConfirm(
        "Xác nhận",
        "Bạn có chắc muốn xóa không?",
        "Xóa",
        "Hủy"
      ).then((res) => {
        if (res.isConfirmed) {
          requestDeleteRegion(id).then(() => {
            showAlertSuccess("Xóa thành công", "Đã xóa thành công!");
            refetchRegionList();
          });
        }
      });
    },
    [refetchRegionList, requestDeleteRegion]
  );

  const renderCardComponent = useCallback(
    () =>
      regionList.map((val: IRegion) => (
        <Grid key={val.id} item sm={12} md={6} xl={4} padding={"15px"}>
          <CardItem
            name={val.name}
            slogan={val.slogan}
            img={val.image}
            onView={() => onView(val.id.toString())}
            onEdit={() => PageEdit(val.id.toString())}
            onDelete={() => onDelete(val.id.toString())}
          />
        </Grid>
      )),
    [PageEdit, onDelete, onView, regionList]
  );

  useEffect(() => {
    setIsLoading(loadingRegionList);
  }, [loadingRegionList, setIsLoading]);

  return { renderCardComponent, PageCreate };
};

// Hook for create page:
export const useRegionCreateHook = () => {
  const { PageList } = useNavigateCRUD(url);
  const { requestCreateRegion } = useCallAPICreate();

  const formCreate = useForm();

  const { handleSubmit } = formCreate;

  const onSubmit = handleSubmit(
    useCallback(
      (data: any) => {
        requestCreateRegion(data).then(() => {
          showAlertSuccess("Tạo mới thành công", "đã tạo Miền mới thành công!");
          setTimeout(() => PageList(), 2000);
        });
      },
      [requestCreateRegion, PageList]
    )
  );

  return { formCreate, PageList, onSubmit };
};

// Hook for edit page:
export const useRegionEditHook = () => {
  const location = useLocation();
  const regionID = GetIdParams(location.pathname);
  const { PageList } = useNavigateCRUD(url);
  const { requestFindRegionByID } = useCallAPIFind();
  const { requestUpdateRegion } = useCallAPIUpdate();
  const { setIsLoading } = useLoadingContext();

  const formEdit = useForm();

  const { handleSubmit, reset } = formEdit;

  const onSubmit = handleSubmit(
    useCallback(
      (data: any) => {
        const dataSubmit = {
          id: regionID,
          data: data,
        };

        requestUpdateRegion(dataSubmit).then(() => {
          showAlertSuccess(
            "Cập nhật thành công",
            "đã cập nhật Miền mới thành công!"
          );
          setTimeout(() => PageList(), 2000);
        });
      },
      [regionID, requestUpdateRegion, PageList]
    )
  );

  useEffect(() => {
    setIsLoading(true);
    requestFindRegionByID(regionID).then((data) => {
      reset(data);
      setIsLoading(false);
    });
  }, [regionID, requestFindRegionByID, reset, setIsLoading]);

  return { formEdit, PageList, onSubmit };
};
