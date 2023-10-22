import { useMediaQuery, useTheme } from "@mui/material";
import { ReactNode, createContext, useMemo, useContext } from "react";

interface Props {
  children: ReactNode;
}

type SettingContextProps = {
  isMobile: boolean;
  isTabletMini: boolean;
  isTablet: boolean;
  isDesktop: boolean;
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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTabletMini = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const provideProps = useMemo(
    () => ({
      isMobile,
      isTabletMini,
      isTablet,
      isDesktop,
    }),
    [isMobile, isTabletMini, isTablet, isDesktop]
  );

  return (
    <>
      <MasterContext.Provider value={provideProps}>
        {children}
      </MasterContext.Provider>
    </>
  );
};
