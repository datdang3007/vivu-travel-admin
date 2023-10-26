import { RouteObject } from "react-router-dom";
import ScrollToTop from "src/components/ScrollToTop";
import { MainLayout } from "src/layouts";
import {
  Place,
  ProvinceCreate,
  ProvinceEdit,
  ProvinceList,
  RegionCreate,
  RegionEdit,
  RegionList,
  StaffManager,
  Statistics,
  Territory,
  UserManager,
} from "src/pages";
import { ImageList } from "src/pages/ImageList";
import { PATH } from "./path";

const protectedRoute: RouteObject = {
  element: <MainLayout />,
  children: [
    {
      element: <ScrollToTop />,
      children: [
        {
          path: PATH.STATISTICS,
          element: <Statistics />,
        },
        {
          path: PATH.USER_MANAGER,
          element: <UserManager />,
        },
        {
          path: PATH.STAFF_MANAGER,
          element: <StaffManager />,
        },

        // REGION:
        {
          path: PATH.REGION,
          element: <RegionList />,
        },
        {
          path: `${PATH.REGION}/edit/:id`,
          element: <RegionEdit />,
        },
        {
          path: `${PATH.REGION}/create`,
          element: <RegionCreate />,
        },

        // TERRITORY:
        {
          path: PATH.TERRITORY,
          element: <Territory />,
        },

        // PROVINCE:
        {
          path: PATH.PROVINCE,
          element: <ProvinceList />,
        },
        {
          path: `${PATH.PROVINCE}/edit/:id`,
          element: <ProvinceEdit />,
        },
        {
          path: `${PATH.PROVINCE}/create`,
          element: <ProvinceCreate />,
        },

        // PLACE:
        {
          path: PATH.PLACE,
          element: <Place />,
        },
        {
          path: PATH.IMAGE_LIST,
          element: <ImageList />,
        },
      ],
    },
  ],
};

export default protectedRoute;
