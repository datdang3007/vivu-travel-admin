import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_VI } from "material-react-table/locales/vi";
import { useStaffListHook } from "src/hooks";

export const StaffList = () => {
  const { staffData, columns } = useStaffListHook();

  return (
    <MaterialReactTable
      columns={columns}
      data={staffData}
      enableStickyHeader
      localization={MRT_Localization_VI}
      muiTableContainerProps={{ sx: { height: `calc(100vh - 332.5px)` } }}
    />
  );
};
