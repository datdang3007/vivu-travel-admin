import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_VI } from "material-react-table/locales/vi";
import { usePostListHook } from "src/hooks/post.hook";

export const PostList = () => {
  const { postData, columns } = usePostListHook();

  return (
    <MaterialReactTable
      columns={columns}
      data={postData}
      enableStickyHeader
      localization={MRT_Localization_VI}
      muiTableContainerProps={{ sx: { height: `calc(100vh - 332.5px)` } }}
    />
  );
};
