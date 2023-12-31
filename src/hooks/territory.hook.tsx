import { Grid } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { CardItem } from "src/UI";
import { ITerritory } from "src/interfaces";
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
  useSelectHook,
} from "./common.hook";
import { useLoadingContext } from "src/provider/loading.provider";
import { PROCESS_ENV } from "src/constants/env";

const url = PATH.TERRITORY;

// Hook for list page:
export const useTerritoryListHook = () => {
  const { PageCreate, PageEdit } = useNavigateCRUD(url);
  const { territoryList, refetchTerritoryList, loadingTerritoryList } =
    useCallApi();
  const { requestDeleteTerritory } = useCallAPIDelete();
  const { setIsLoading } = useLoadingContext();

  // EVENT WHEN CLICK BUTTON VIEW:
  const onView = useCallback((id: string) => {
    window.open(`${PROCESS_ENV.USER_PAGE_URL}/territory/${id}`, "_blank");
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
          requestDeleteTerritory(id).then(() => {
            showAlertSuccess("Xóa thành công", "Đã xóa thành công!");
            refetchTerritoryList();
          });
        }
      });
    },
    [refetchTerritoryList, requestDeleteTerritory]
  );

  const renderCardComponent = useCallback(
    () =>
      territoryList.map((val: ITerritory) => (
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
    [PageEdit, onDelete, onView, territoryList]
  );

  useEffect(() => {
    setIsLoading(loadingTerritoryList);
  }, [loadingTerritoryList, setIsLoading]);

  return { renderCardComponent, PageCreate };
};

// Hook for create page:
export const useTerritoryCreateHook = () => {
  const { regionList } = useCallApi();
  const { PageList } = useNavigateCRUD(url);
  const { requestCreateTerritory } = useCallAPICreate();
  const { SelectField: regionOptionComponent } = useSelectHook(regionList);

  const formCreate = useForm({
    defaultValues: {
      region: "",
    },
  });

  const { handleSubmit } = formCreate;

  const onSubmit = handleSubmit(
    useCallback(
      (data: any) => {
        requestCreateTerritory(data).then(() => {
          showAlertSuccess("Tạo mới thành công", "đã tạo Vùng mới thành công!");
          setTimeout(() => PageList(), 2000);
        });
      },
      [PageList, requestCreateTerritory]
    )
  );

  return { formCreate, onSubmit, PageList, regionOptionComponent };
};

// Hook for edit page:
export const useTerritoryEditHook = () => {
  const location = useLocation();
  const territoryID = GetIdParams(location.pathname);
  const { regionList } = useCallApi();
  const { PageList } = useNavigateCRUD(url);
  const { requestFindTerritoryByID } = useCallAPIFind();
  const { requestUpdateTerritory } = useCallAPIUpdate();
  const { SelectField: regionOptionComponent } = useSelectHook(regionList);
  const { setIsLoading } = useLoadingContext();

  const formEdit = useForm({
    defaultValues: {
      region: "",
    },
  });

  const { handleSubmit, reset } = formEdit;

  const onSubmit = handleSubmit(
    useCallback(
      (data: any) => {
        const dataSubmit = {
          id: territoryID,
          data: data,
        };

        requestUpdateTerritory(dataSubmit).then(() => {
          showAlertSuccess(
            "Cập nhật thành công",
            "đã cập nhật Vùng mới thành công!"
          );
          setTimeout(() => PageList(), 2000);
        });
      },
      [PageList, requestUpdateTerritory, territoryID]
    )
  );

  useEffect(() => {
    setIsLoading(true);
    requestFindTerritoryByID(territoryID).then((data) => {
      const convertData = { ...data, region: data.region.id };
      reset(convertData);
      setIsLoading(false);
    });
  }, [requestFindTerritoryByID, reset, setIsLoading, territoryID]);

  return { formEdit, onSubmit, PageList, regionOptionComponent };
};
