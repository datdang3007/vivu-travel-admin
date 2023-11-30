import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_VI } from "material-react-table/locales/vi";
import { useUserListHook } from "src/hooks";

export const UserList = () => {
  const { columns, userData } = useUserListHook();
  return (
    <MaterialReactTable
      columns={columns}
      data={userData}
      enableStickyHeader
      localization={MRT_Localization_VI}
      muiTableContainerProps={{ sx: { height: `calc(100vh - 332.5px)` } }}
    />
  );
};
