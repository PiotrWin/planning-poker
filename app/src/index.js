import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

import Application from 'components/App/App';
import registerServiceWorker from 'utils/registerServiceWorker';
import store from 'store/store';
import history from 'utils/history';

import 'normalize.css';
import 'shared/styles/global.scss';

const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjt2z41er2kdu01333j4qs87m',
});

const wsLink = new WebSocketLink({
  uri: 'wss://subscriptions.graph.cool/v1/cjt2z41er2kdu01333j4qs87m',
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const app = (
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <Provider store={store}>
        <Router history={history}>
          <Application />
        </Router>
      </Provider>
    </ApolloHooksProvider>
  </ApolloProvider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
