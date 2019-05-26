import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Link } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import ClientList from 'components/ClientList/ClientList';

const SessionView = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [session, setSession] = useState('');
  const { id } = match.params;

  const handleSessionChange = () => {
    // try {
    //   let sessionData = await snapshot.val();
    //   if (!sessionData) {
    //     const sessionSnap = await api.session.get(id);
    //     sessionData = await sessionSnap.val();
    //     if (!sessionData) {
    //       throw new Error('404 - session not found');
    //     }
    //   }
    //   api.session.join(id);
    //   setSession(sessionData);
    // } catch (e) {
    //   setError(e.toString());
    // } finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    // api.session.subscribe(id, handleSessionChange);
    // return () => {
    //   api.session.unsubscribe(id, handleSessionChange);
    //   api.session.leave(id);
    // };
  }, []);

  const errorComponent = (
    <React.Fragment>
      <h3>{error}</h3>
      <Link to="/my-sessions">{'<- back to sessions'}</Link>
    </React.Fragment>
  );
  const component = loading ? (
    <Loader />
  ) : (
    <React.Fragment>
      <ClientList clients={session.clients} />
      <main>
        <h2>{session.name}</h2>
        <span>Created: </span>
        <span>{moment(session.created).format('dddd, MMMM Do YYYY, h:mm A')}</span>
        <div>{JSON.stringify(session.clients, null, 2)}</div>
      </main>
    </React.Fragment>
  );

  return !error ? component : errorComponent;
};

SessionView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default SessionView;
