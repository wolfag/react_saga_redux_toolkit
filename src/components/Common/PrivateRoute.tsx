import React, { ReactElement } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export function PrivateRoute(props: RouteProps): ReactElement {
  const isLoggedIn = !!localStorage.getItem('access_token');

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
}
