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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTabletMini = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isDesktop = useMediaQuery(theme.breakpoints.between("lg", "xl"));
  const isBigDesktop = useMediaQuery(theme.breakpoints.up("xl"));

  const provideProps = useMemo(
    () => ({
      isMobile,
      isTabletMini,
      isTablet,
      isDesktop,
      isBigDesktop,
    }),
    [isMobile, isTabletMini, isTablet, isDesktop, isBigDesktop]
  );

  return (
    <>
      <MasterContext.Provider value={provideProps}>
        {children}
      </MasterContext.Provider>
    </>
  );
};
