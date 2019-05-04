import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getSessions } from 'store/actions/sessions';
import {
  getAllSessions,
  getSessionsLoading,
} from 'store/selectors';

import SessionsList from 'components/SessionsList/SessionsList';
import Loader from 'components/Loader/Loader';

const MySessionsView = ({
  sessions, loading, onGetSessions,
}) => {
  const { ownSessions, visitedSessions } = sessions;

  useEffect(() => {
    onGetSessions();
  }, []);

  return (loading) ? <Loader /> : (
    <main>
      <SessionsList
        title="Created by me:"
        sessions={ownSessions}
      />
      <SessionsList
        title="Visited by me:"
        sessions={visitedSessions}
      />
    </main>
  );
};

MySessionsView.propTypes = {
  sessions: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  onGetSessions: PropTypes.func.isRequired,
};

const mapState = state => ({
  sessions: getAllSessions(state),
  loading: getSessionsLoading(state),
});

const mapDispatch = {
  onGetSessions: getSessions,
};

export default connect(mapState, mapDispatch)(MySessionsView);
