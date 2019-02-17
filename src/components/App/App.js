import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { userStateChanged } from 'store/actions/auth';
import { auth } from 'fbase/firebase';
import SignInView from 'views//SignIn/SignIn';

import Navigation from 'components/Navigation/Navigation';
import ConditionalRoute from 'components/ConditionalRoute/ConditionalRoute';
import classes from './App.scss';
import './style.scss';

const app = ({ signedIn, onUserStateChanged }) => {
  useEffect(() => {
    auth.onAuthStateChanged(onUserStateChanged);
    return () => auth.onAuthStateChanged(null);
  }, []);

  return (
    <Fragment>
      <div className={classes.background} />
      <Navigation />
      <div className={classes.wrapper}>
        <Switch>
          <ConditionalRoute
            enabled={signedIn}
            path="/estimate"
            redirectPath="/sign-in"
            component={SignInView}
          />
          <Route path="/sign-in" component={SignInView} />
          <Route exact path="/" component={SignInView} />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    </Fragment>
  );
};

app.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  onUserStateChanged: PropTypes.func.isRequired,
};

const mapState = state => ({
  signedIn: state.auth.signedIn,
});

const mapDispatch = dispatch => ({
  onUserStateChanged: user => dispatch(userStateChanged(user)),
});

export { app as AppUnwrapped };
export default hot(module)(connect(
  mapState,
  mapDispatch,
  null,
  { pure: false },
)(app));
