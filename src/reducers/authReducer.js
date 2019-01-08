import * as types from "../constants/ActionTypes";

const initialState = {
  token: null,
  username: null,
  password: null,
  isAuthenticated: false,
  isAuthenticating: false,
  errorText: null
};

export default function authReducer(state = initialState, action) {
  console.log("action fired", action);
  switch (action.type) {
    case types.LOGIN_USER_REQUEST:
      return Object.assign({}, state, {
        isAuthenticating: true
      });
    case types.LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        token: action.token
      });
    case types.LOGIN_USER_ERROR:
      return Object.assign({}, state, {
        isAuthenticating: false,
        errorText: `FEEEJL: ${action.errorText}`
      });
    case types.HANDLE_CHANGE_USERNAME:
      return Object.assign({}, state, {
        username: action.username
      });
    case types.HANDLE_CHANGE_PASSWORD:
      return Object.assign({}, state, {
        password: action.password
      });
    default:
      return state;
  }
}
