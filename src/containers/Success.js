import React from "react";
import { connect } from "react-redux";
import {
  loginUser,
  handleChangeUsername,
  handleChangePassword
} from "../actions/authActions";

class Success extends React.Component {
  handleChangeUsername = e => {
    const { dispatch } = this.props;
    dispatch(handleChangeUsername(e.target.value));
  };
  handleChangePassword = e => {
    const { dispatch } = this.props;
    dispatch(handleChangePassword(e.target.value));
  };

  handleSubmit = e => {
    const { dispatch } = this.props;
    e.preventDefault();
    dispatch(loginUser());
  };

  render() {
    const { username, password, errorText } = this.props.auth;

    return (
      <div>
        {errorText ? <p>{errorText}</p> : null}
        <form className="c-todo__section" onSubmit={this.handleSubmit}>
          <input
            className="c-todo__input"
            type="text"
            id="username"
            onChange={this.handleChangeUsername}
            value={username ? username : ""}
          />
          <input
            className="c-todo__input"
            type="text"
            id="password"
            onChange={this.handleChangePassword}
            value={password ? password : ""}
          />
          <button type="submit" className="c-todo__icon">
            <i className="material-icons">assignment_returned</i>
          </button>
        </form>
      </div>
    );
  }
}

/* MAPSTATETOPROPS */
function mapStateToProps(state, ownProps) {
  return {
    auth: state.authReducer
  };
}

export default connect(mapStateToProps)(Success);
