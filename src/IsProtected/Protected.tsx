import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type ProtectedProps = {
  children: ReactNode;
};

const Protected = ({ children }: ProtectedProps) => {
  if (localStorage.getItem("token")) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default Protected;
