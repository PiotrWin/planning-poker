import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SessionsList = ({ sessions }) => (
  <div>
    <div>Sessions List</div>
    <ul>
      {sessions.map(session => (
        <li key={session.id}>{session.name}</li>
      ))}
    </ul>
  </div>
);

SessionsList.propTypes = {
  sessions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapState = state => ({
  sessions: state.db.sessions,
});

export default connect(mapState)(SessionsList);
