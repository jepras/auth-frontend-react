import * as types from "../constants/ActionTypes";

// handle login request
export function loginUserSuccess(token) {
  return { type: types.LOGIN_USER_SUCCESS, token };
}
export function loginUserError(errorText) {
  return { type: types.LOGIN_USER_ERROR, errorText };
}
export function loginUserRequest() {
  return { type: types.LOGIN_USER_REQUEST };
}

// handle association
export function associateRequired(mfaToken) {
  return { type: types.ASSOCIATE_REQUIRED, mfaToken };
}

// handle login change
export function handleChangeUsername(username) {
  return {
    type: types.HANDLE_CHANGE_USERNAME,
    username
  };
}

export function handleChangePassword(password) {
  return { type: types.HANDLE_CHANGE_PASSWORD, password };
}

// handle phone number change
export function handleChangePhone(phone) {
  return { type: types.HANDLE_CHANGE_PHONE, phone };
}

// submit phone number
export function submitPhone() {
  // dispatch action - validate
  // fetch mfa/associate - send phone number + access_token (the mfa_token)
  return (dispatch, getState) => {
    const { mfaToken, phone } = getState().authReducer;
    console.log(mfaToken);

    return fetch(
      "http://localhost:5333/mfa/associate",
      postObject({ phone_number: phone, access_token: mfaToken })
    )
      .then(response => response.json())
      .then(json => {
        console.log(json);
        // dispatch request, error (refresh field and try again), success
        if (json.error) {
          dispatch(loginPhoneError(json.error));
        } else {
          dispatch(loginPhoneSuccess(json.oob_code));
        }
      });
    // error handling

    // redirect to sms code injection
    // call mfa/verify - inject mfa_token, oob_token & binding_code(sms)
    // same as login
  };
}

// Enter phone number
export function loginPhoneSuccess(oob_code) {
  return { type: types.PHONE_NUMBER_SUCCESS, oob_code };
}
export function challengeSuccess(oob_code, mfaToken) {
  return { type: types.CHALLENGE_SUCCESS, oob_code, mfaToken };
}
export function loginPhoneError(errorText) {
  return { type: types.PHONE_NUMBER_ERROR, errorText };
}
export function loginPhoneRequest() {
  return { type: types.PHONE_NUMBER_REQUEST };
}

// handle phone number change
export function handleChangeSms(sms) {
  return { type: types.HANDLE_CHANGE_SMS, sms };
}

// submit sms code
export function submitSms() {
  return (dispatch, getState) => {
    const { mfaToken, oob_code, binding_code } = getState().authReducer;
    console.log(getState().authReducer);

    return fetch(
      "http://localhost:5333/mfa/verify",
      postObject({ oob_code, mfa_token: mfaToken, binding_code })
    )
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json.error) {
          dispatch(loginUserError(json.error));
        } else {
          dispatch(loginUserSuccess(json.access_token));
        }
      });
  };
}

// Enter sms code
export function smsCodeSuccess(token) {
  return { type: types.SMS_CODE_SUCCESS, token };
}
export function smsCodeError(errorText) {
  return { type: types.SMS_CODE_ERROR, errorText };
}
export function smsCodeRequest() {
  return { type: types.SMS_CODE_REQUEST };
}

// new associateFunction with accesstoken, phone, org & send to /mfa/associate & get Ood code.

let postObject = body => {
  body.org = org;
  return {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };
};

const org = "fritzhansen";

export function loginUser() {
  return (dispatch, getState) => {
    // dispatch first - loading (request_login)
    dispatch(loginUserRequest());
    const { username, password } = getState().authReducer;

    // do API call
    return (
      fetch("http://localhost:5333/login", postObject({ username, password }))
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
            console.log("mfa required!");
            fetch(
              "http://localhost:5333/mfa/challenge",
              postObject({ mfa_token: json.mfa_token })
            )
              .then(response => response.json())
              .then(challengeJson => {
                console.log(challengeJson);
                console.log(json);
                if (challengeJson.error === "association_required") {
                  dispatch(associateRequired(json.mfa_token));
                } else if (challengeJson.error) {
                  dispatch(loginUserError(challengeJson.error));
                } else {
                  dispatch(
                    challengeSuccess(challengeJson.oob_code, json.mfa_token)
                  );
                }
              });
          } else {
            dispatch(loginUserSuccess(json.access_token));
          }
        })
        .catch(error => {
          // dispatch error

          dispatch(loginUserError(error.message));
          // interepret on error
        })
    );
  };
}
