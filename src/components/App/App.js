import React, { useEffect, lazy } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { userStateChanged } from 'store/actions/auth';
import { auth } from 'fbase/firebase';

import Navigation from 'components/Navigation/Navigation';
import ConditionalRoute from 'components/ConditionalRoute/ConditionalRoute';
import Loader from 'components/Loader/Loader';
import classes from 'components/App/App.scss';

const SignInView = lazy(() => import('views/SignIn/SignIn'));
const EstimateView = lazy(() => import('views/Estimate/Estimate'));
const MySessionsView = lazy(() => import('views/MySessions/MySessions'));
const SessionView = lazy(() => import('views/Session/Session'));

const App = ({
  signedIn, initialized, onUserStateChanged, authenticateGoogleUser,
}) => {
  useEffect(() => {
    auth.onAuthStateChanged(async (data) => {
      if (data) {
        const token = await auth.currentUser.getIdToken();
        const response = await authenticateGoogleUser({
          variables: {
            googleToken: token,
            displayName: data.displayName,
            email: data.email,
          },
        });
        console.log(response);
      }
      onUserStateChanged(data);
    });
    return () => auth.onAuthStateChanged(null);
  }, []);

  return (
    <React.Fragment>
      <div className={classes['u-background']} />
      <Navigation />
      <div className={classes['l-app-wrapper']}>
        {initialized ? (
          <Switch>
            <ConditionalRoute
              enabled={signedIn}
              path="/estimate"
              redirectPath="/sign-in"
              component={EstimateView}
            />
            <ConditionalRoute
              enabled={signedIn}
              path="/sessions/:id"
              redirectPath="/sign-in"
              component={SessionView}
            />
            <ConditionalRoute
              enabled={signedIn}
              path="/my-sessions"
              // exact
              redirectPath="/sign-in"
              component={MySessionsView}
            />
            <ConditionalRoute
              enabled={!signedIn}
              path="/sign-in"
              redirectPath="/"
              component={SignInView}
            />
            <Redirect from="*" to={signedIn ? '/estimate' : '/sign-in'} />
          </Switch>
          ) : <Loader />
        }
      </div>
    </React.Fragment>
  );
};

App.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  initialized: PropTypes.bool.isRequired,
  onUserStateChanged: PropTypes.func.isRequired,
  authenticateGoogleUser: PropTypes.func.isRequired,
};

const mapState = state => ({
  signedIn: state.auth.signedIn,
  initialized: state.auth.initialAuthFinished,
});

const mapDispatch = dispatch => ({
  onUserStateChanged: user => dispatch(userStateChanged(user)),
});

const AUTHENTICATE_USER_MUTATION = gql`
  mutation authenticateGoogleUserMutation(
    $googleToken: String!,
    $displayName: String!,
    $email: String!
  ) {
    authenticateGoogleUser(
      googleToken: $googleToken,
      displayName: $displayName,
      email: $email
    ) {
        id
        displayName
        email
    }
  }
`;

const AppWithGql = graphql(AUTHENTICATE_USER_MUTATION, {
  name: 'authenticateGoogleUser',
})(App);

export { App as AppUnwrapped };
export default hot(module)(connect(
  mapState,
  mapDispatch,
  null,
  { pure: false },
)(AppWithGql));
