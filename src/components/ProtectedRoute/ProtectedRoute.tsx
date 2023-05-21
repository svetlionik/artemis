import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import { isLoginSuccess } from 'store/auth/selector';

const ProtectedRoute = ({
  component: Component,
  ...rest
}: {
  component: (params: object) => JSX.Element | null;
  path: string;
  exact: boolean;
}) => {
  const isAuthenticated = useSelector(isLoginSuccess);

  const renderComponent = () => <Component />;

  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated ? (
          renderComponent()
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
