import * as React from 'react';
import { Navigate, Outlet, Route, RouteProps } from 'react-router-dom';

export interface PrivateLayoutProps {}

export function PrivateLayout(props: RouteProps) {
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  if (!isLoggedIn) return <Navigate to="/login" />;
  return <Outlet />;
}
