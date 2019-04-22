export const getUserData = user => ({
  displayName: user.displayName,
  email: user.email,
  gid: user.uid,
});

export default getUserData;
