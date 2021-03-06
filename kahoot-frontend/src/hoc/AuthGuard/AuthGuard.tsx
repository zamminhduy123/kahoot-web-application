import React, { ReactElement, useEffect, useState } from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hook";

interface AuthGuardProps {
  children: ReactElement | ReactElement[];
}

const   AuthGuard = ({ children }: AuthGuardProps) => {
  const {id} = useAppSelector(state => state.auth)

  if (id) return <>{children}</>;
  else {
    return <Navigate to={"/join"} />;
  }
};

export default AuthGuard;
