import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { db } from 'fbase/firebase';
import { getSessions } from 'store/actions/db';
import SessionsList from 'components/SessionsList/SessionsList';
import Loader from 'components/Loader/Loader';


const MySessionView = ({
  loading,
  userPath,
  getUserSessions,
}) => {
  useEffect(() => {
    db.ref(`${userPath}/sessions`).on('value', getUserSessions);
    return () => db.ref(`${userPath}/sessions`).off('value', getUserSessions);
  }, []);

  return loading ? <Loader /> : (
    <div>
      <div>My sessions</div>
      <SessionsList />
    </div>
  );
};

MySessionView.propTypes = {
  loading: PropTypes.bool.isRequired,
  userPath: PropTypes.string.isRequired,
  getUserSessions: PropTypes.func.isRequired,
};

const mapState = state => ({
  loading: state.db.loading,
  userPath: state.db.userPath,
});

const mapDispatch = dispatch => ({
  getUserSessions: () => dispatch(getSessions()),
});

export default connect(mapState, mapDispatch)(MySessionView);
