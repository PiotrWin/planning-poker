import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const ClientList = ({ clients }) => {
  // const [users, setUsers] = useState([]);

  useEffect(() => {
    // console.log(clients);
  }, [clients]);

  return (
    <div>
      {JSON.stringify(clients, null, 2)}
    </div>
  );
};

ClientList.propTypes = {
  clients: PropTypes.shape(),
};

ClientList.defaultProps = {
  clients: {},
};

export default ClientList;
