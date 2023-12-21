import { ReactNode, createContext, useContext, useMemo, useState } from "react";

interface Props {
  children: ReactNode;
}

type LoadingContextProps = {
  isLoading: boolean;
  setIsLoading: (bool: boolean) => void;
};

const LoadingContext = createContext<LoadingContextProps | null>(null);

export const useLoadingContext = () => {
  const ctx = useContext(LoadingContext);

  if (!ctx) {
    throw new Error("need provider");
  }
  return ctx;
};

export const LoadingProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const provideProps = useMemo(
    () => ({
      isLoading,
      setIsLoading,
    }),
    [isLoading, setIsLoading]
  );

  return (
    <LoadingContext.Provider value={provideProps}>
      {children}
    </LoadingContext.Provider>
  );
};
