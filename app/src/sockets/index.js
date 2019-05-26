import { Manager } from 'socket.io-client';

// TODO: import store and dispatch actions here

const endpoint = 'http://localhost:80';

const manager = new Manager(endpoint, {
  reconnection: true,
  reconnectionAttempts: 10,
});

export const connect = () => manager.connect((error) => {
  // TODO: dispatch error
  console.error(error);
});

export default {
  connect,
  socket: manager,
};
