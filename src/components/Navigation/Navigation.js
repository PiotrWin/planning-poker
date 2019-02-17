import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from 'store/actions/auth';

import Button from 'components/Button/Button';
import classes from './Navigation.scss';

const Navigation = ({ onSignOut }) => (
  <nav className={classes.nav}>
    <div className={`${classes.nav__sub} ${classes['nav__sub--left']}`}>
      <NavLink
        className={classes.nav__link}
        activeClassName={classes['nav__link--active']}
        to="/estimate"
      >
    Estimate
      </NavLink>
      <NavLink
        className={classes.nav__link}
        activeClassName={classes['nav__link--active']}
        to="/my-estimates"
      >
    My estimates
      </NavLink>
    </div>
    <div className={`${classes.nav__sub} ${classes['nav__sub--right']}`}>
      <Button
        className={classes.nav__button}
        onClick={onSignOut}
      >
        Sign out
      </Button>
    </div>
  </nav>
);

Navigation.propTypes = {
  onSignOut: PropTypes.func.isRequired,
};

const mapDispatch = dispatch => ({
  onSignOut: () => dispatch(signOut()),
});

export default connect(
  null,
  mapDispatch,
  null,
  { pure: false },
)(Navigation);
