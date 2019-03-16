import gql from 'graphql-tag';

export const getUser = gql`
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

export const getSession = gql`
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

export const getSessions = gql`
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
