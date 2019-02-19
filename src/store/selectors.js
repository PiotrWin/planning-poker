export const isSignedIn = ({ auth }) => auth.signedIn;
export const initialAuthFinished = ({ auth }) => auth.initialAuthFinished;
export const userId = ({ auth }) => auth.uid;
export const userPath = ({ db }) => db.userPath;
