import React, { forwardRef } from 'react';

import classes from './Input.scss';

const Input = forwardRef((props, ref) => (
  <input
    className={classes.Input}
    ref={ref}
    {...props}
  />
));

export default Input;
