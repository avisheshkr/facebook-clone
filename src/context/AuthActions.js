export const loginStart = () => ({
  type: "LOGIN_START",
});

export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginFail = (error) => ({
  type: "LOGIN_FAIL",
  payload: error,
});

// export const loginStart = () => ({
//   type: "LOGIN_START",
// });

// export const loginSuccess = (user) => ({
//   type: "LOGIN_SUCCESS",
//   payload: user,
// });

// export const loginFail = (error) => ({
//   type: "LOGIN_FAIL",
//   payload: error,
// });
