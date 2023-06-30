import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type NotProtectedProps = {
  children: ReactNode;
};

const NotProtected = ({ children }: NotProtectedProps) => {
  if (!localStorage.getItem("token")) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default NotProtected;
