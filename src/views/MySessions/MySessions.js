import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { db } from 'fbase/firebase';
import { sessionsFetched } from 'store/actions/db';
import SessionsList from 'components/SessionsList/SessionsList';
import Loader from 'components/Loader/Loader';

const MySessionView = ({
  loading,
  userPath,
  onSessionsFetched,
}) => {
  useEffect(() => {
    db.ref(`${userPath}/sessions`).on('value', onSessionsFetched);
    return () => db.ref(`${userPath}/sessions`).off('value', onSessionsFetched);
  }, []);

  return loading ? <Loader /> : (
    <div>
      <h2>My sessions</h2>
      <SessionsList />
    </div>
  );
};

MySessionView.propTypes = {
  loading: PropTypes.bool.isRequired,
  userPath: PropTypes.string.isRequired,
  onSessionsFetched: PropTypes.func.isRequired,
};

const mapState = state => ({
  loading: state.db.loading,
  userPath: state.db.userPath,
});

const mapDispatch = dispatch => ({
  onSessionsFetched: snapshot => dispatch(sessionsFetched(snapshot.val())),
});

export default connect(mapState, mapDispatch)(MySessionView);
