import { Suspense } from "react";
import { Navigate, Outlet, RouteObject, useRoutes } from "react-router-dom";
import { LoadingModule } from "../components/Loading";
import { Login } from "../pages";
import protectedRoute from "./MainRoute";
import { PATH } from "./path";
import { LOCAL_STORAGE } from "src/constants/local_storage";
import { Role } from "src/constants/role";
import { showAlertError } from "src/utils/alert";

const RoleProtects = [Role.SuperAdmin, Role.Admin];

const ProtectRouter = () => {
  const role = localStorage.getItem(LOCAL_STORAGE.UserRole);
  const isRoleValid = RoleProtects.includes(Number(role));
  if (role && !isRoleValid) {
    showAlertError(
      "Đăng nhập thất bại!",
      "Tài khoản không được cấp quyền truy cập"
    );
  }
  if (!isRoleValid) {
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
