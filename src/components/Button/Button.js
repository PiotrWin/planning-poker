import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({
  onClick, className, children, ...rest
}) => (
  <button
    {...rest}
    className={className ? `${className} button` : 'button'}
    onClick={onClick}
    data-testid="btn"
  >
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
};

Button.defaultProps = {
  className: '',
};

export default Button;
