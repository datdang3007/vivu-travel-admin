import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { ActionCell, ImageCell, TextCell } from "src/components/Cell";
import { IProvince } from "src/interfaces/province.interface";
import { PATH } from "src/routes/path";
import { useCallApi, useNavigateCRUD, useSelectHook } from "./common.hook";

const url = PATH.PROVINCE;

// Hook for list page:
export const useProvinceListHook = () => {
  const [provinceData, setProvinceData] = useState<IProvince[]>([]);
  const { PageList, PageEdit, PageCreate } = useNavigateCRUD(url);
  const { provinceList } = useCallApi();

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
        Cell: ActionCell,
        enableSorting: false,
        enableColumnActions: false,
        enableGlobalFilter: false,
      },
    ],
    []
  );

  useEffect(() => {
    setProvinceData(provinceList);
  }, [provinceList]);

  return {
    columns,
    PageList,
    PageEdit,
    PageCreate,
    provinceData,
  };
};

// Hook for create page:
export const useProvinceCreateHook = () => {
  const { territoryList } = useCallApi();
  const { SelectField: territoryOptionComponent } =
    useSelectHook(territoryList);

  const formCreate = useForm({
    defaultValues: {
      territory: -1,
    },
  });

  return { formCreate, territoryOptionComponent };
};
