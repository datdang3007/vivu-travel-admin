import { ActionCell, TextCell, ImageCell, LinkCell } from "src/components/Cell";
import { PATH } from "src/routes/path";
import { PlaceProps } from "src/types/ApiData";
import MaterialReactTable from "material-react-table";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MRT_Localization_VI } from "material-react-table/locales/vi";

const dataTemp = [
  {
    id: "1",
    name: "Lai Châu",
    image:
      "https://cdn.discordapp.com/attachments/1089123119668658206/1101165831527866450/toancanh1.png",
    region_name: "Miền Bắc",
    territory_name: "Tây Bắc",
    province_name: "Tây Bắc",
    image_stock: "100 ảnh",
  },
  {
    id: "2",
    name: "Hòa Bình",
    image:
      "https://cdn.discordapp.com/attachments/1085804453246009374/1106235497145176095/Hoa_Binh.jpg",
    region_name: "Miền Bắc",
    territory_name: "Tây Bắc",
    province_name: "Tây Bắc",
    image_stock: "100 ảnh",
  },
];

export const PlaceList = () => {
  const [placeData, setPlaceData] = useState<any[]>([]);
  const tableInstanceRef = useRef(null);

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
        accessorKey: "region_name",
        header: "Miền",
        Cell: TextCell({}),
      },
      {
        id: "territory_name",
        accessorKey: "territory_name",
        header: "Vùng",
        Cell: TextCell({}),
      },
      {
        id: "province_name",
        accessorKey: "province_name",
        header: "Tỉnh Thành",
        Cell: TextCell({}),
      },
      {
        id: "image_stock",
        accessorKey: "image_stock",
        header: "Kho Ảnh",
        Cell: LinkCell({ to: PATH.IMAGE_LIST, target: "_blank" }),
      },
      {
        id: "button",
        header: "Thao Tác",
        Cell: ActionCell({}),
        enableSorting: false,
        enableColumnActions: false,
        enableGlobalFilter: false,
      },
    ],
    []
  );

  //   HANDLE EVENT:
  const handleLoadDataAPI = useCallback(
    (list?: PlaceProps[]) => {
      const dataRows = [...placeData];
      list?.map((val) => {
        dataRows.push({
          name: val.name,
          image: val.image,
          region_name: val.region_name,
          territory_name: val.territory_name,
          province_name: val.province_name,
          image_stock: val.image_stock,
        });
      });
      setPlaceData(dataRows);
    },
    [placeData]
  );

  useEffect(() => {
    handleLoadDataAPI(dataTemp);
  }, []);

  return (
    <MaterialReactTable
      columns={columns}
      data={placeData}
      enableStickyHeader
      enableColumnFilters={false}
      tableInstanceRef={tableInstanceRef}
      localization={MRT_Localization_VI}
      muiTableContainerProps={{ sx: { height: `calc(100vh - 332.5px)` } }}
    />
  );
};
