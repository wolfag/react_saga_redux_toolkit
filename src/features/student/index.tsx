import React, { ReactElement } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddEditPage from './pages/AddEditPage';
import ListPage from './pages/ListPage';

export function StudentFeature(): ReactElement {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}`} exact>
        <ListPage />
      </Route>
      <Route path={`${match.path}/add`}>
        <AddEditPage />
      </Route>
      <Route path={`${match.path}/studentId`}>
        <AddEditPage />
      </Route>
    </Switch>
  );
}
