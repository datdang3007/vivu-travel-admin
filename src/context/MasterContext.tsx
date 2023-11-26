import { useMediaQuery, useTheme } from "@mui/material";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useMutation } from "react-query";
import { getUserProfile } from "src/apis/auth.api";
import { LOCAL_STORAGE } from "src/constants/local_storage";
import { IAuthUser } from "src/interfaces";

interface Props {
  children: ReactNode;
}

type SettingContextProps = {
  user: IAuthUser | null;
  setUser: (data: IAuthUser | null) => void;
  isMobile: boolean;
  isTabletMini: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isBigDesktop: boolean;
};

const MasterContext = createContext<SettingContextProps | null>(null);

export const useMasterContext = () => {
  const ctx = useContext(MasterContext);

  if (!ctx) {
    throw new Error("need provider");
  }
  return ctx;
};

export const MasterProvider = ({ children }: Props) => {
  const theme = useTheme();
  const [user, setUser] = useState<IAuthUser | null>(null);

  // Define device:
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTabletMini = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isDesktop = useMediaQuery(theme.breakpoints.between("lg", "xl"));
  const isBigDesktop = useMediaQuery(theme.breakpoints.up("xl"));

  // -- Get User Profile:
  const { mutateAsync: GetUserProfile } = useMutation({
    mutationFn: getUserProfile,
    onSuccess: (data) => {
      setUser(data);
      if (data) {
        const { role } = data;
        localStorage.setItem(LOCAL_STORAGE.UserRole, role.toString());
      }
    },
    onError: (error) => {
      console.error(error);
      setUser(null);
    },
  });

  useEffect(() => {
    GetUserProfile();
  }, [GetUserProfile]);
  // -- End

  const provideProps = useMemo(
    () => ({
      user,
      setUser,
      isMobile,
      isTabletMini,
      isTablet,
      isDesktop,
      isBigDesktop,
    }),
    [user, isMobile, isTabletMini, isTablet, isDesktop, isBigDesktop]
  );

  return (
    <>
      <MasterContext.Provider value={provideProps}>
        {children}
      </MasterContext.Provider>
    </>
  );
};
