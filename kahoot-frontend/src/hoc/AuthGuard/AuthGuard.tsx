import React, { ReactElement, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface AuthGuardProps {
  children: ReactElement | ReactElement[];
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const [previousRoute, setPreviousRoute] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    if (!!previousRoute) setPreviousRoute(pathname);
  }, [pathname, previousRoute]);

  if (true) return <>{children}</>;
  else {
    return <Navigate to={"/login"} state={previousRoute} />;
  }
};

export default AuthGuard;
