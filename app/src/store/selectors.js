export const isSignedIn = ({ auth }) => auth.signedIn;
export const initialAuthFinished = ({ auth }) => auth.initialAuthFinished;
export const userId = ({ auth }) => auth.id;
export const googleId = ({ auth }) => auth.gid;
export const userPath = ({ db }) => db.userPath;
export const currentSession = ({ db }) => db.currentSession;
