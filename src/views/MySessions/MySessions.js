import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSessions } from 'store/actions/db';
import SessionsList from 'components/SessionsList/SessionsList';
import Loader from 'components/Loader/Loader';


const MySessionView = ({ loading, initialized, getUserSessions }) => {
  useEffect(() => {
    if (!initialized) {
      getUserSessions();
    }
  }, []);

  return loading ? <Loader /> : (
    <div>
      <div>My sessions</div>
      <SessionsList />
    </div>
  );
};

MySessionView.propTypes = {
  loading: PropTypes.bool.isRequired,
  initialized: PropTypes.bool.isRequired,
  getUserSessions: PropTypes.func.isRequired,
};

const mapState = state => ({
  initialized: state.db.initialFetchDone,
  loading: state.db.loading,
});

const mapDispatch = dispatch => ({
  getUserSessions: () => dispatch(getSessions()),
});

export default connect(mapState, mapDispatch)(MySessionView);
