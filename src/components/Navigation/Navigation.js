import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from 'store/actions/auth';

import Button from 'components/Button/Button';
import classes from './Navigation.scss';
import { auth } from 'firebase';

const Navigation = ({ signedIn, displayName, onSignOut }) => (
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
      {signedIn && (
        <Fragment>
          <div
            className={`${classes.nav__link} ${classes['nav__link--current-user']}`}
          >
            {displayName}
          </div>
          <Button
            className={classes.nav__button}
            onClick={onSignOut}
          >
            Sign out
          </Button>
        </Fragment>
      )}
    </div>
  </nav>
);

Navigation.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  displayName: PropTypes.string.isRequired,
  onSignOut: PropTypes.func.isRequired,
};

const mapState = state => ({
  signedIn: state.auth.signedIn,
  displayName: state.auth.displayName,
});

const mapDispatch = dispatch => ({
  onSignOut: () => dispatch(signOut()),
});

export default connect(
  mapState,
  mapDispatch,
  null,
  { pure: false },
)(Navigation);
