import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getSessions } from 'store/actions/db';

import SessionsList from 'components/SessionsList/SessionsList';
import Loader from 'components/Loader/Loader';

const MySessionsView = ({ id, onGetSessions }) => {
  const [ownSessions, setOwnSessions] = useState([]);
  const [visitedSessions, setVisitedSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onGetSessions();
  }, []);

  // const query = useQuery(GET_SESSIONS, { variables }); // TODO: handle error

  // useSubscription(USER_SESSIONS, {
  //   variables: { userId: id },
  //   onSubscriptionData: () => {
  //     query.refetch();
  //   },
  // });

  // useEffect(() => {
  //   query.refetch();
  //   // api.sessions.subscribe(onSessionsFetched);
  //   // return () => api.sessions.unsubscribe(onSessionsFetched);
  // }, []);

  // useEffect(() => {
  //   if (query.data) {
  //     const { User } = query.data;
  //     if (User) {
  //       setOwnSessions([...User.ownSessions]);
  //       setVisitedSessions([...User.visitedSessions]);
  //       setLoading(false);
  //     }
  //   }
  // }, [query.data]);

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
  id: PropTypes.string.isRequired,
  onGetSessions: PropTypes.func.isRequired,
};

const mapState = state => ({
  id: state.auth.id,
});

const mapDispatch = {
  onGetSessions: getSessions,
};

export default connect(mapState, mapDispatch)(MySessionsView);
