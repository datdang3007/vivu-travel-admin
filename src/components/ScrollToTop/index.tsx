import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    document
      .getElementById("scrollToTop")
      ?.scrollIntoView({ behavior: "auto" });
  }, [location]);

  return (
    <>
      <span id="scrollToTop" />
      <Outlet />
    </>
  );
};

export default ScrollToTop;
