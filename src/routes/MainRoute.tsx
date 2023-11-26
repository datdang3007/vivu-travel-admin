import { RouteObject } from "react-router-dom";
import ScrollToTop from "src/components/ScrollToTop";
import { MainLayout } from "src/layouts";
import {
  PlaceCreate,
  PlaceEdit,
  PlaceImageStock,
  PlaceList,
  ProvinceCreate,
  ProvinceEdit,
  ProvinceList,
  RegionCreate,
  RegionEdit,
  RegionList,
  StaffManager,
  Statistics,
  TerritoryCreate,
  TerritoryEdit,
  TerritoryList,
  UserManager,
} from "src/pages";
import { PATH } from "./path";
import { PostManager } from "src/pages/PostManager";

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
        {
          path: `${PATH.IMAGE_STOCK}/place/:id`,
          element: <PlaceImageStock />,
        },
        {
          path: PATH.POST_MANAGER,
          element: <PostManager />,
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
          element: <TerritoryList />,
        },
        {
          path: `${PATH.TERRITORY}/edit/:id`,
          element: <TerritoryEdit />,
        },
        {
          path: `${PATH.TERRITORY}/create`,
          element: <TerritoryCreate />,
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
          element: <PlaceList />,
        },
        {
          path: `${PATH.PLACE}/edit/:id`,
          element: <PlaceEdit />,
        },
        {
          path: `${PATH.PLACE}/create`,
          element: <PlaceCreate />,
        },
      ],
    },
  ],
};

export default protectedRoute;
