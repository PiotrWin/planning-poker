import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { addSession } from 'store/actions/db';

import { graphql } from 'react-apollo';
import { createSessionMutation } from 'graphql/mutations';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Label from 'components/Label/Label';
import classes from './NewSessionForm.scss';

const NewSessionForm = ({ id, createNewSession }) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value.length) {
      const response = await createNewSession({
        variables: {
          name: value,
          createdById: id,
        },
      });
      console.log(response);
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
  createNewSession: PropTypes.func.isRequired,
};

const mapState = state => ({
  id: state.auth.id,
});

const FormWithGql = graphql(createSessionMutation, {
  name: 'createNewSession',
})(NewSessionForm);

export default connect(mapState)(FormWithGql);
