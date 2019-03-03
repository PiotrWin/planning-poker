import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import api from 'fbase/api';
import { sessionsFetched } from 'store/actions/db';
import SessionsList from 'components/SessionsList/SessionsList';
import Loader from 'components/Loader/Loader';

const MySessionView = ({
  loading,
  onSessionsFetched,
}) => {
  useEffect(() => {
    api.sessions.subscribe(onSessionsFetched);
    return () => api.sessions.unsubscribe(onSessionsFetched);
  }, []);

  return loading ? <Loader /> : (
    <main>
      <h2>My sessions</h2>
      <SessionsList />
    </main>
  );
};

MySessionView.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSessionsFetched: PropTypes.func.isRequired,
};

const mapState = state => ({
  loading: state.db.loading,
});

const mapDispatch = dispatch => ({
  onSessionsFetched: snapshot => dispatch(sessionsFetched(snapshot.val())),
});

export default connect(mapState, mapDispatch)(MySessionView);
