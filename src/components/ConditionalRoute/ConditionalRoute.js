import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Loader from 'components/Loader/Loader';

const ConditionalRoute = ({
  enabled,
  redirectPath,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (enabled
      ? (
        <Suspense fallback={<Loader />}>
          <Component {...props} />
        </Suspense>
      ) : <Redirect to={redirectPath} />)
    }
  />
);

ConditionalRoute.propTypes = {
  enabled: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  redirectPath: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
};

export default ConditionalRoute;
