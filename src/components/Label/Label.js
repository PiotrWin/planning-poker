import React from 'react';
import PropTypes from 'prop-types';

import classes from './Label.scss';

const Label = ({ htmlFor, children, ...props }) => (
  <label
    className={classes.Label}
    {...props}
    htmlFor={htmlFor}
    data-testid="label"
  >
    {children}
  </label>
);

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
};

export default Label;
