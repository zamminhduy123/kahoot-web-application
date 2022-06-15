import React, { ReactElement, useEffect, useState } from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hook";

interface AuthGuardProps {
  children: ReactElement | ReactElement[];
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const {user} = useAppSelector(state => state.auth)

  if (user) return <>{children}</>;
  else {
    return <Navigate to={"/login"} />;
  }
};

export default AuthGuard;
