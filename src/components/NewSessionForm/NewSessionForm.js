import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { addSession } from 'store/actions/db';


import Button from 'components/Button/Button';

const NewSessionForm = ({ startNewSession }) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.length) {
      startNewSession(value);
      setValue('');
    }
  };

  const handleChange = e => setValue(e.target.value);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        required
        minLength={1}
        maxLength={50}
        value={value}
        onChange={handleChange}
        ref={inputRef}
      />
      <Button type="submit" onClick={handleSubmit}>Start</Button>
    </form>
  );
};

NewSessionForm.propTypes = {
  startNewSession: PropTypes.func.isRequired,
};

const mapDispatch = dispatch => ({
  startNewSession:
    (sessionName, history) => dispatch(addSession(sessionName, history)),
});

export default connect(null, mapDispatch)(NewSessionForm);
