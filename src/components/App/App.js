import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { userStateChanged } from 'store/actions/auth';
import { auth } from 'fbase/firebase';
import SignInView from 'views//SignIn/SignIn';
import Navigation from '../Navigation/Navigation';
import './style.scss';

const app = ({ onUserStateChanged }) => {
  useEffect(() => {
    auth.onAuthStateChanged(onUserStateChanged);
    return () => auth.onAuthStateChanged(null);
  }, []);

  return (
    <Fragment>
      <Navigation />
      <Route path="/" component={SignInView} />
    </Fragment>
  );
};

app.propTypes = {
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
)(app));
