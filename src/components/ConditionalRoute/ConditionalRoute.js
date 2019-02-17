import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const ConditionalRoute = ({
  enabled,
  redirectPath,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (enabled
      ? <Component {...props} />
      : <Redirect to={redirectPath} />)
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
