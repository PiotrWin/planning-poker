import gql from 'graphql-tag';

export const GET_USER = gql`
  query ($id: ID!) {
    User(id: $id) {
      id
      displayName
      email
      ownSessions
      visitedSessions
    }
  }
`;

export const GET_SESSION = gql`
  query ($id: ID!) {
    Session(id: $id) {
      name
      createdAt
      createdBy {
        displayName
      }
      clients {
        displayName
      }
      _clientsMeta {
        count
      }
    }
  }
`;

export const GET_SESSIONS = gql`
  query ($id: ID!) {
    User(id: $id) {
      ownSessions {
        id
        name
        createdAt
        createdBy {
          id
          displayName
        }
      }
      visitedSessions {
        id
        name
        createdAt
        createdBy {
          id
          displayName
        }
      }
    }
  }
`;
