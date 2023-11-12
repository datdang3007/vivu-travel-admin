import { useMediaQuery, useTheme } from "@mui/material";
import { ReactNode, createContext, useContext, useMemo, useState } from "react";
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
