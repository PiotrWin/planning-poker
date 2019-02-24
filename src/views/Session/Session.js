import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { db } from 'fbase/firebase';

import { Link } from 'react-router-dom';
import Loader from 'components/Loader/Loader';

const SessionView = ({ match, userPath }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [session, setSession] = useState({
    name: 'Loading...',
    created: 'Loading...',
  });
  const { id } = match.params;

  const handleSessionChange = async (snapshot) => {
    try {
      const sessionData = await snapshot.val();
      if (!sessionData) {
        throw new Error('404 - session not found');
      }
      setSession(sessionData);
    } catch (e) {
      setError(e.toString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const path = `${userPath}/sessions/${id}`;
    db.ref(path).on('value', handleSessionChange);
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
};

const mapState = state => ({
  userPath: state.db.userPath,
});

export default connect(mapState)(SessionView);
