export const getUserData = user => ({
  displayName: user.displayName,
  email: user.email,
  uid: user.uid,
});

export default getUserData;
