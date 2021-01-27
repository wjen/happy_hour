import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from '../services/auth.service';

function AuthRoute({ component: Component, ...rest }) {
  const user = getCurrentUser();
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

export default AuthRoute;
