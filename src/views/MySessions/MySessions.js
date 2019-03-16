import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { useQuery } from 'react-apollo-hooks';
import { getSessions } from 'graphql/queries';

import SessionsList from 'components/SessionsList/SessionsList';
import Loader from 'components/Loader/Loader';

const MySessionsView = ({ id }) => {
  const [ownSessions, setOwnSessions] = useState([]);
  const [visitedSessions, setVisitedSessions] = useState([]);
  const { loading, data } = useQuery(getSessions, { variables: { id } });

  useEffect(() => {
    // api.sessions.subscribe(onSessionsFetched);
    // return () => api.sessions.unsubscribe(onSessionsFetched);
  }, []);

  useEffect(() => {
    const { User } = data;
    if (User) {
      setOwnSessions([...User.ownSessions]);
      setVisitedSessions([...User.visitedSessions]);
    }
  }, [data]);

  return loading ? <Loader /> : (
    <main>
      <SessionsList
        title="Created by me:"
        sessions={ownSessions}
      />
      <SessionsList
        title="Created by others:"
        sessions={visitedSessions}
      />
    </main>
  );
};

MySessionsView.propTypes = {
  id: PropTypes.string.isRequired,
};

const mapState = state => ({
  id: state.auth.id,
});

export default connect(mapState)(MySessionsView);
