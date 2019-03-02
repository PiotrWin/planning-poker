import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { db } from 'fbase/firebase';
import * as api from 'fbase/api';

import { Link } from 'react-router-dom';
import Loader from 'components/Loader/Loader';

const SessionView = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [session, setSession] = useState('');
  const { id } = match.params;

  const handleSessionChange = async (snapshot) => {
    try {
      let sessionData = await snapshot.val();
      if (!sessionData) {
        const sessionRef = await db.ref(`/sessions/${id}`).once('value');
        sessionData = await sessionRef.val();
        if (!sessionData) {
          throw new Error('404 - session not found');
        }
      }
      setSession(sessionData);
    } catch (e) {
      setError(e.toString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const path = `/sessions/${id}`;
    db.ref(path).on('value', handleSessionChange);
    api.joinSession(id);
    api.leaveSessionOnDisconnect(id);
    return () => {
      db.ref(path).off('value', handleSessionChange);
      api.leaveSession(id);
    };
  }, []);

  const errorComponent = (
    <React.Fragment>
      <h3>{error}</h3>
      <Link to="/my-sessions">{'<- back to sessions'}</Link>
    </React.Fragment>
  );
  const component = (loading ? <Loader /> : (
    <React.Fragment>
      <h2>{session.name}</h2>
      <span>Created:{' '}</span>
      <span>
        {moment(session.created).format('dddd, MMMM Do YYYY, h:mm A')}
      </span>
      <div>
        {JSON.stringify(session.clients, null, 2)}
      </div>
    </React.Fragment>
  ));

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
