import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from 'store/actions/auth';

const navigation = ({ onSignOut }) => (
  <nav>
    <Link to="/estimate">Estimate</Link>
    <Link to="/my-estimates">My estimates</Link>
    <button onClick={onSignOut}>Sign out</button>
  </nav>
);

navigation.propTypes = {
  onSignOut: PropTypes.func.isRequired,
};

const mapDispatch = dispatch => ({
  onSignOut: () => dispatch(signOut()),
});


export default connect(null, mapDispatch)(navigation);
