import { cityApi } from 'api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import { push } from 'connected-react-router';
import { selectIsLoggedIn } from 'features/auth/authSlice';
import LoginPage from 'features/auth/pages/LoginPage';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

function App() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    cityApi.getAll().then((res) => console.log(res.data));
  }, []);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     dispatch(push('/admin'));
  //   } else {
  //     dispatch(push('/login'));
  //   }
  // }, [dispatch, isLoggedIn]);

  return (
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>
      <PrivateRoute path="/admin">
        <AdminLayout />
      </PrivateRoute>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
