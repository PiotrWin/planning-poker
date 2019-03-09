import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from 'fbase/api';

import Button from 'components/Button/Button';
import classes from './SessionsList.scss';

const SessionsList = ({ sessions, title }) => (
  <div className={classes.ListWrapper}>
    {title && <h2>{title}</h2>}
    <ul className={classes.List}>
      {sessions.map(session => (
        <li className={classes.ListItem} key={session.id}>
          <Link to={`/sessions/${session.id}`}>{session.name}</Link>
          <Button
            onClick={() => api.session.remove(session.id)}
            className={classes.ButtonRemove}
          >
            x
          </Button>
        </li>
      ))}
    </ul>
  </div>
);

SessionsList.propTypes = {
  sessions: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
};

SessionsList.defaultProps = {
  title: null,
};

export default SessionsList;
