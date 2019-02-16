import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signIn } from 'store/actions/auth';
import classes from './SignIn.scss';

const signInView = ({ onSignIn }) => (
  <div className={classes.SignIn}>
    <h1>Planning Poker</h1>
    <span>Plan your sprints easily!</span>
    <button onClick={onSignIn}>Sign in</button>
    <span>to get started!</span>
  </div>
);

signInView.propTypes = {
  onSignIn: PropTypes.func.isRequired,
};

const mapDispatch = dispatch => ({
  onSignIn: () => dispatch(signIn()),
});

export default connect(null, mapDispatch)(signInView);
