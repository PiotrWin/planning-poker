import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSession } from 'store/actions/db';

import Button from 'components/Button/Button';

const NewSessionForm = ({ startNewSession }) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState('');
  const placeholder = 'New session';

  const handleSubmit = (e) => {
    e.preventDefault();
    startNewSession(value.length ? value : placeholder);
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
        placeholder={placeholder}
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
  startNewSession: sessionName => dispatch(addSession(sessionName)),
});

export default connect(null, mapDispatch)(NewSessionForm);
