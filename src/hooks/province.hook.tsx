import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { ActionCell, ImageCell, TextCell } from "src/components/Cell";
import { IProvince } from "src/interfaces/province.interface";
import { PATH } from "src/routes/path";
import { showAlertSuccess } from "src/utils/alert";
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

const url = PATH.PROVINCE;

// Hook for list page:
export const useProvinceListHook = () => {
  const [provinceData, setProvinceData] = useState<IProvince[]>([]);
  const { PageEdit, PageCreate } = useNavigateCRUD(url);
  const { requestDeleteProvince } = useCallAPIDelete();
  const { provinceList, refetchProvinceList } = useCallApi();

  const handleActionEdit = useCallback(
    (id: string) => {
      PageEdit(id);
    },
    [PageEdit]
  );

  // EVENT WHEN CLICK BUTTON DELETE:
  const handleActionDelete = useCallback(
    (id: string) => {
      requestDeleteProvince(id).then(() => {
        showAlertSuccess("Xóa thành công", "Đã xóa thành công!");
        refetchProvinceList();
      });
    },
    [refetchProvinceList, requestDeleteProvince]
  );

  // SET UP COLUMN FIELD:
  const columns = useMemo(
    () => [
      {
        id: "image",
        header: "",
        accessorKey: "image",
        enableSorting: false,
        enableColumnActions: false,
        enableGlobalFilter: false,
        Cell: ImageCell,
        maxSize: 120,
      },
      {
        id: "name",
        accessorKey: "name",
        header: "Tên",
        Cell: TextCell({ sx: { fontSize: "18px", fontWeight: "bold" } }),
      },
      {
        id: "region_name",
        accessorKey: "region.name",
        header: "Miền",
        Cell: TextCell({}),
      },
      {
        id: "territory_name",
        accessorKey: "territory.name",
        header: "Vùng",
        Cell: TextCell({}),
      },
      {
        id: "button",
        header: "Thao Tác",
        Cell: ActionCell({
          onEdit: handleActionEdit,
          onDelete: handleActionDelete,
        }),
        enableSorting: false,
        enableColumnActions: false,
        enableGlobalFilter: false,
        size: 140,
      },
    ],
    [handleActionDelete, handleActionEdit]
  );

  useEffect(() => {
    setProvinceData(provinceList);
  }, [provinceList]);

  return {
    columns,
    PageEdit,
    PageCreate,
    provinceData,
  };
};

// Hook for create page:
export const useProvinceCreateHook = () => {
  const { territoryList } = useCallApi();
  const { PageList } = useNavigateCRUD(url);
  const { requestCreateProvince } = useCallAPICreate();
  const { SelectField: territoryOptionComponent } =
    useSelectHook(territoryList);

  const formCreate = useForm({
    defaultValues: {
      territory: "",
    },
  });

  const { handleSubmit } = formCreate;

  const onSubmit = handleSubmit(
    useCallback(
      (data: any) => {
        requestCreateProvince(data).then(() => {
          showAlertSuccess(
            "Tạo mới thành công",
            "đã tạo Tỉnh Thành mới thành công!"
          );
          setTimeout(() => PageList(), 2000);
        });
      },
      [PageList, requestCreateProvince]
    )
  );

  return { formCreate, onSubmit, PageList, territoryOptionComponent };
};

// Hook for edit page:
export const useProvinceEditHook = () => {
  const location = useLocation();
  const provinceID = GetIdParams(location.pathname);
  const { territoryList } = useCallApi();
  const { requestFindProvinceByID } = useCallAPIFind();
  const { requestUpdateProvince } = useCallAPIUpdate();
  const navigate = useNavigate();
  const { SelectField: territoryOptionComponent } =
    useSelectHook(territoryList);

  const formEdit = useForm({
    defaultValues: {
      territory: "",
    },
  });

  const { handleSubmit, reset } = formEdit;

  // HANDLE EVENT:
  const onClickBackToList = useCallback(() => {
    navigate(PATH.PROVINCE);
  }, [navigate]);

  const onSubmit = handleSubmit(
    useCallback(
      (data: any) => {
        const dataSubmit = {
          id: provinceID,
          data: data,
        };

        requestUpdateProvince(dataSubmit).then(() => {
          showAlertSuccess(
            "Cập nhật thành công",
            "đã cập nhật Tỉnh Thành mới thành công!"
          );
          setTimeout(() => onClickBackToList(), 2000);
        });
      },
      [onClickBackToList, provinceID, requestUpdateProvince]
    )
  );

  useEffect(() => {
    requestFindProvinceByID(provinceID).then((data) => {
      const convertData = { ...data, territory: data.territory.id };
      reset(convertData);
    });
  }, [provinceID, requestFindProvinceByID, reset]);

  return { formEdit, onSubmit, onClickBackToList, territoryOptionComponent };
};
