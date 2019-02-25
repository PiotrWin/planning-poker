import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classes from './SessionsList.scss';

const SessionsList = ({ sessions }) => (
  <div className={classes.ListWrapper}>
    <ul className={classes.List}>
      {sessions.map(session => (
        <li className={classes.ListItem} key={session.id}>
          <Link to={`/sessions/${session.id}`}>{session.name}</Link>
        </li>
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
