import * as types from "../constants/ActionTypes";

export function loginUserSuccess(token) {
  return { type: types.LOGIN_USER_SUCCESS, token };
}
export function loginUserError(errorText) {
  return { type: types.LOGIN_USER_ERROR, errorText };
}
export function loginUserRequest() {
  return { type: types.LOGIN_USER_REQUEST };
}

export function handleChangeUsername(username) {
  return {
    type: types.HANDLE_CHANGE_USERNAME,
    username
  };
}

export function handleChangePassword(password) {
  return { type: types.HANDLE_CHANGE_PASSWORD, password };
}

// new associateFunctino with accesstoken, phone, org & send to /mfa/associate & get Ood code.

export function loginUser() {
  return (dispatch, getState) => {
    // dispatch first - loading (request_login)
    dispatch(loginUserRequest());
    console.log(getState());
    const { username, password } = getState().authReducer;
    // do API call
    return (
      fetch("http://localhost:5333/login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password, org: "fritzhansen" })
      })
        // check response
        .then(response => response.json())
        .then(json => {
          console.log(json);
          // dispatch success
          /* try / catch for error? */
          if (json.error && json.error !== "mfa_required") {
            throw new Error(json.error);
          } else if (json.error && json.error === "mfa_required") {
            // call new endpoint mfa/challenge with mfa token - get associate required
            // if redux.store.needAssociation = true - show phone formula
          }
          dispatch(loginUserSuccess(json.access_token));
        })
        .catch(error => {
          // dispatch error

          dispatch(loginUserError(error.message));
          // interepret on error
        })
    );
  };
}
