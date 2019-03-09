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
  sessions,
  uid,
}) => {
  useEffect(() => {
    api.sessions.subscribe(onSessionsFetched);
    return () => api.sessions.unsubscribe(onSessionsFetched);
  }, []);

  return loading ? <Loader /> : (
    <main>
      <SessionsList
        title="Created by me:"
        sessions={sessions.filter(s => s.createdBy === uid)}
      />
      <SessionsList
        title="Created by others:"
        sessions={sessions.filter(s => s.createdBy !== uid)}
      />
    </main>
  );
};

MySessionView.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSessionsFetched: PropTypes.func.isRequired,
  sessions: PropTypes.arrayOf(PropTypes.object).isRequired,
  uid: PropTypes.string.isRequired,
};

const mapState = state => ({
  loading: state.db.loading,
  sessions: state.db.sessions,
  uid: state.auth.uid,
});

const mapDispatch = dispatch => ({
  onSessionsFetched: snapshot => dispatch(sessionsFetched(snapshot.val())),
});

export default connect(mapState, mapDispatch)(MySessionView);
