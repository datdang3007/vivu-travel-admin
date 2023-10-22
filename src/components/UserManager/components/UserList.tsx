import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { MaterialReactTable } from "material-react-table";
import { UserProps } from "src/types/ApiData";
import { ActionCell, TextCell } from "src/components/Cell";
import { MRT_Localization_VI } from "material-react-table/locales/vi";

const dataTemp = [
  {
    id: "64392ea80020b337c88384c1",
    name: "Nguyễn Văn A",
    email: "example_01@gmail.com",
  },
  {
    id: "64392ea80020b337c88384c2",
    name: "Nguyễn Văn B",
    email: "example_02@gmail.com",
  },
  {
    id: "64392ea80020b337c88384c3",
    name: "Nguyễn Văn C",
    email: "example_03@gmail.com",
  },
  {
    id: "64392ea80020b337c88384c4",
    name: "Nguyễn Văn D",
    email: "example_04@gmail.com",
  },
  {
    id: "64392ea80020b337c88384c5",
    name: "Nguyễn Văn E",
    email: "example_05@gmail.com",
  },
];

export const UserList = () => {
  const [userData, setUserData] = useState<any[]>([]);
  const tableInstanceRef = useRef(null);

  // SET UP COLUMN FIELD:
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        Cell: TextCell({}),
      },
      {
        accessorKey: "name",
        header: "Tên",
        Cell: TextCell({}),
      },
      {
        accessorKey: "email",
        header: "Email",
        Cell: TextCell({}),
      },
      {
        id: "button",
        header: "Thao Tác",
        Cell: ActionCell,
        enableSorting: false,
        enableColumnActions: false,
      },
    ],
    []
  );

  //   HANDLE EVENT:
  const handleLoadDataAPI = useCallback(
    (list?: UserProps[]) => {
      const dataRows = [...userData];
      list?.map((val) => {
        dataRows.push({
          id: val.id,
          name: val.name,
          email: val.email,
        });
      });
      setUserData(dataRows);
    },
    [userData]
  );

  useEffect(() => {
    handleLoadDataAPI(dataTemp);
  }, []);

  return (
    <MaterialReactTable
      columns={columns}
      data={userData}
      enableStickyHeader
      tableInstanceRef={tableInstanceRef}
      localization={MRT_Localization_VI}
      muiTableContainerProps={{ sx: { height: `calc(100vh - 332.5px)` } }}
    />
  );
};
