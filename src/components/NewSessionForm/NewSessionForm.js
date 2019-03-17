import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { useMutation } from 'react-apollo-hooks';
import { CREATE_SESSION } from 'graphql/mutations';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Label from 'components/Label/Label';
import classes from './NewSessionForm.scss';

const NewSessionForm = ({ id }) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState('');
  const createNewSession = useMutation(CREATE_SESSION, {
    variables: {
      name: value,
      createdById: id,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value.length) {
      await createNewSession();
      setValue('');
    }
  };

  const handleChange = e => setValue(e.target.value);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form
      className={classes.Form}
      onSubmit={handleSubmit}
    >
      <Label htmlFor="session-name">
        <span>Enter the name of the session</span>
        <Input
          id="session-name"
          type="text"
          required
          minLength={1}
          maxLength={50}
          value={value}
          onChange={handleChange}
          ref={inputRef}
        />
      </Label>
      <Button type="submit" onClick={handleSubmit}>Start</Button>
    </form>
  );
};

NewSessionForm.propTypes = {
  id: PropTypes.string.isRequired,
};

const mapState = state => ({
  id: state.auth.id,
});

export default connect(mapState)(NewSessionForm);
