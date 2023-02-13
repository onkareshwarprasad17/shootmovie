// For using only Redux
export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";

const appReducer = (state, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        loggedIn: true,
      };
    case USER_LOGGED_OUT:
      return {
        loggedIn: false,
      };
    default:
      return state;
  }
};
export default appReducer;
