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
  id,
}) => {
  useEffect(() => {
    api.sessions.subscribe(onSessionsFetched);
    return () => api.sessions.unsubscribe(onSessionsFetched);
  }, []);

  return loading ? <Loader /> : (
    <main>
      <SessionsList
        title="Created by me:"
        sessions={sessions.filter(s => s.createdBy === id)}
      />
      <SessionsList
        title="Created by others:"
        sessions={sessions.filter(s => s.createdBy !== id)}
      />
    </main>
  );
};

MySessionView.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSessionsFetched: PropTypes.func.isRequired,
  sessions: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
};

const mapState = state => ({
  loading: state.db.loading,
  sessions: state.db.sessions,
  id: state.auth.id,
});

const mapDispatch = dispatch => ({
  onSessionsFetched: snapshot => dispatch(sessionsFetched(snapshot.val())),
});

export default connect(mapState, mapDispatch)(MySessionView);
