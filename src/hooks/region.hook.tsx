import { Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { CardItem } from "src/UI";
import { IRegion } from "src/interfaces";
import { PATH } from "src/routes/path";
import {
  useCallAPICreate,
  useCallAPIDelete,
  useCallAPIFind,
  useCallAPIUpdate,
  useCallApi,
  useNavigateCRUD,
} from "./common.hook";
import { useForm } from "react-hook-form";
import { showAlertSuccess } from "src/utils/alert";
import { GetIdParams } from "src/utils/common";
import { useLocation } from "react-router-dom";

const url = PATH.REGION;

// Hook for list page:
export const useRegionListHook = () => {
  const [regionData, setRegionData] = useState<IRegion[]>([]);
  const { PageCreate, PageEdit } = useNavigateCRUD(url);
  const { regionList, refetchRegionList } = useCallApi();
  const { requestDeleteRegion } = useCallAPIDelete();

  // EVENT WHEN CLICK BUTTON DELETE:
  const onDelete = useCallback(
    (id: string) => {
      requestDeleteRegion(id).then(() => {
        showAlertSuccess("Xóa thành công", "Đã xóa thành công!");
        refetchRegionList();
      });
    },
    [refetchRegionList, requestDeleteRegion]
  );

  const renderCardComponent = useCallback(
    () =>
      regionData.map((val: IRegion) => (
        <Grid key={val.id} item sm={12} md={6} xl={4} padding={"15px"}>
          <CardItem
            name={val.name}
            slogan={val.slogan}
            img={val.image}
            onEdit={() => PageEdit(val.id.toString())}
            onDelete={() => onDelete(val.id.toString())}
          />
        </Grid>
      )),
    [PageEdit, onDelete, regionData]
  );

  useEffect(() => {
    setRegionData(regionList);
  }, [regionList]);

  return { regionList, renderCardComponent, PageCreate };
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
    requestFindRegionByID(regionID).then((data) => {
      reset(data);
    });
  }, [regionID, requestFindRegionByID, reset]);

  return { formEdit, PageList, onSubmit };
};
