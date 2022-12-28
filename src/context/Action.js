export const LoginStart = (credentials) => ({
  type: "LOGIN_START",
});
export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});
export const LoginEnd = (error) => ({
  type: "LOGIN_FAILED",
  payload: error,
});
