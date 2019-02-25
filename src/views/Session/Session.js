import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { db } from 'fbase/firebase';

import { joinSession as joinSessionAction } from 'store/actions/db';

import { Link } from 'react-router-dom';
import Loader from 'components/Loader/Loader';

const SessionView = ({ match, userPath, joinSession }) => {
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
      joinSession(id);
    } catch (e) {
      setError(e.toString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const path = `${userPath}/sessions/${id}`;
    db.ref(path).on('value', handleSessionChange);

    // db.ref(`/sessions/${id}`).onDisconnect();

    return () => db.ref(path).off('value', handleSessionChange);
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
  userPath: PropTypes.string.isRequired,
  joinSession: PropTypes.func.isRequired,
};

const mapState = state => ({
  userPath: state.db.userPath,
});

const mapDispatch = dispatch => ({
  joinSession: id => dispatch(joinSessionAction(id)),
});

export default connect(mapState, mapDispatch)(SessionView);
