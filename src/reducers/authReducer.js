import * as types from "../constants/ActionTypes";

const initialState = {
  accesToken: null,
  username: null,
  password: null,
  isAuthenticated: false,
  isAuthenticating: false,
  errorText: null,
  associateRequired: false,
  activeStep: 0,
  mfaToken: null,
  phone: null,
  binding_code: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_USER_REQUEST:
      return Object.assign({}, state, {
        isAuthenticating: true
      });
    case types.LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        accesToken: action.token
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
    case types.HANDLE_CHANGE_PHONE:
      return Object.assign({}, state, {
        phone: action.phone
      });
    case types.HANDLE_CHANGE_SMS:
      return Object.assign({}, state, {
        binding_code: action.sms
      });
    case types.ASSOCIATE_REQUIRED:
      return Object.assign({}, state, {
        associateRequired: true,
        activeStep: 1,
        mfaToken: action.mfaToken
      });
    case types.PHONE_NUMBER_REQUEST:
      return Object.assign({}, state, {
        isAuthenticating: true
      });
    case types.PHONE_NUMBER_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticating: false,
        oob_code: action.oob_code,
        activeStep: 2
      });
    case types.CHALLENGE_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticating: false,
        oob_code: action.oob_code,
        mfaToken: action.mfaToken,
        activeStep: 2
      });
    case types.PHONE_NUMBER_ERROR:
      return Object.assign({}, state, {
        isAuthenticating: false,
        errorText: `FEEEJL: ${action.errorText}`
      });
    default:
      return state;
  }
}
