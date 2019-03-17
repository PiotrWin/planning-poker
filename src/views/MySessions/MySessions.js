import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { useQuery, useSubscription } from 'react-apollo-hooks';
import { GET_SESSIONS } from 'graphql/queries';
import { USER_SESSIONS } from 'graphql/subscriptions';

import SessionsList from 'components/SessionsList/SessionsList';
import Loader from 'components/Loader/Loader';

const MySessionsView = ({ id }) => {
  const variables = { id };

  const [ownSessions, setOwnSessions] = useState([]);
  const [visitedSessions, setVisitedSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = useQuery(GET_SESSIONS, { variables }); // TODO: handle error

  useSubscription(USER_SESSIONS, {
    variables: { userId: id },
    onSubscriptionData: () => {
      query.refetch();
    },
  });

  useEffect(() => {
    query.refetch();
    // api.sessions.subscribe(onSessionsFetched);
    // return () => api.sessions.unsubscribe(onSessionsFetched);
  }, []);

  useEffect(() => {
    if (query.data) {
      const { User } = query.data;
      if (User) {
        setOwnSessions([...User.ownSessions]);
        setVisitedSessions([...User.visitedSessions]);
        setLoading(false);
      }
    }
  }, [query.data]);

  return (loading || query.loading) ? <Loader /> : (
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
  id: PropTypes.string.isRequired,
};

const mapState = state => ({
  id: state.auth.id,
});

export default connect(mapState)(MySessionsView);
