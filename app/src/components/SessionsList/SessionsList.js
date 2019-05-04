import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from 'components/Button/Button';
import classes from './SessionsList.scss';

const SessionsList = ({ sessions, title, handleRemove }) => (
  <div className={classes.ListWrapper}>
    {title && <h2>{title}</h2>}
    <ul className={classes.List}>
      {sessions.map(({ _id: id, name }) => (
        <li className={classes.ListItem} key={id}>
          <Link to={`/sessions/${id}`}>{name}</Link>
          <Button
            onClick={() => handleRemove(id)}
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
  handleRemove: PropTypes.func.isRequired,
};

SessionsList.defaultProps = {
  title: null,
};

export default SessionsList;
