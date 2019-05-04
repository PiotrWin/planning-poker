export const getIsSignedIn = ({ auth }) => auth.signedIn;
export const getInitialAuthFinished = ({ auth }) => auth.initialAuthFinished;
export const getUserId = ({ auth }) => auth.id;
export const getGoogleId = ({ auth }) => auth.gid;

export const getCurrentSession = ({ sessions: { currentSession } }) => currentSession;
export const getAllSessions = ({
  sessions: {
    ownSessions, visitedSessions,
  },
}) => ({ ownSessions, visitedSessions });
export const getSessionsLoading = ({
  sessions: {
    loading,
    initialFetchDone,
  },
}) => initialFetchDone && loading;
