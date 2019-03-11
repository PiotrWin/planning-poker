export const getUserData = user => ({
  displayName: user.displayName,
  email: user.email,
  id: user.id,
});

export default getUserData;
