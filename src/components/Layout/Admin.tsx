import { Button } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';
import React, { ReactElement } from 'react';

interface Props {}

export function AdminLayout({}: Props): ReactElement {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
