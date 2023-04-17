import React, { FC, ReactElement } from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../components/dashboard/Loadable";
import RequiredAuth from "../components/requiredAuth";
import Home from "../components/home";

export const AutoRoutes: FC = (): ReactElement => {
  // eslint-disable-next-line react/no-unstable-nested-components
  const AuthWrapper = (children: JSX.Element) => <RequiredAuth>{children}</RequiredAuth>;
  return (
    <Routes>
      <Route path="/" element={AuthWrapper(<Home />)} />
      <Route path="/dashboard" element={AuthWrapper(<Dashboard />)} />
    </Routes>
  );
};
