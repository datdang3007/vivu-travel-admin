import { Suspense } from "react";
import { Navigate, Outlet, RouteObject, useRoutes } from "react-router-dom";
import { LoadingModule } from "../components/Loading";
import { Login } from "../pages";
import protectedRoute from "./MainRoute";
import { PATH } from "./path";
import { LOCAL_STORAGE } from "src/constants/local_storage";

const ProtectRouter = () => {
  const role = localStorage.getItem(LOCAL_STORAGE.UserRole);
  if (!role) {
    return <Navigate to={PATH.LOGIN} />;
  }
  return <Outlet />;
};

const userRoutes: RouteObject[] = [
  {
    element: <ProtectRouter />,
    children: [{ ...protectedRoute }],
  },
  {
    path: PATH.ROOT,
    element: <Navigate to={PATH.LOGIN} />,
  },
  {
    path: PATH.LOGIN,
    element: <Login />,
  },
];

export default function useRouteElements() {
  const router = useRoutes(userRoutes);

  return <Suspense fallback={<LoadingModule />}>{router}</Suspense>;
}
