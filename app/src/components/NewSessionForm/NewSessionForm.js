import
React, {
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addSession } from 'store/actions/sessions';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Label from 'components/Label/Label';
import classes from './NewSessionForm.scss';

const NewSessionForm = ({ id, addNewSession }) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState('');

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (value.length) {
        addNewSession(value, id);
        setValue('');
      }
    }, [value]);

  const handleChange = useCallback(
    e => setValue(e.target.value),
    [value],
  );

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
  addNewSession: PropTypes.func.isRequired,
};

const mapState = state => ({
  id: state.auth.id,
});

const mapDispatch = {
  addNewSession: addSession,
};

export default connect(mapState, mapDispatch)(NewSessionForm);
