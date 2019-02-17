import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signIn } from 'store/actions/auth';

import Button from 'components/Button/Button';
import classes from './SignIn.scss';

const SignInView = ({ onSignIn }) => (
  <div className={classes.signIn}>
    <h1>Planning Poker</h1>
    <span>Plan your sprints easily!</span>
    <Button onClick={onSignIn}>Sign in</Button>
    <span>to get started!</span>
  </div>
);

SignInView.propTypes = {
  onSignIn: PropTypes.func.isRequired,
};

const mapDispatch = dispatch => ({
  onSignIn: () => dispatch(signIn()),
});

export default connect(null, mapDispatch)(SignInView);
