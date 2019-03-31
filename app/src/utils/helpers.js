export const getUserData = user => ({
  displayName: user.displayName,
  email: user.email,
  id: user.uid,
});

export default getUserData;
