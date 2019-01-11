import React from "react";
import { connect } from "react-redux";
import {
  loginUser,
  handleChangeUsername,
  handleChangePassword
} from "../actions/authActions";

// Material UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

class SignIn extends React.Component {
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
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Provide account info
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={5}>
            <TextField
              required
              name="firstName"
              label="Username"
              fullWidth
              autoComplete="uname"
              id="username"
              onChange={this.handleChangeUsername}
              value={username ? username : ""}
            />
          </Grid>

          <Grid item xs={12} sm={5}>
            <TextField
              required
              label="Password"
              fullWidth
              autoComplete="pword"
              id="password"
              onChange={this.handleChangePassword}
              value={password ? password : ""}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={this.handleSubmit}
              style={{ height: "100%", width: "100%" }}
            >
              Next
            </Button>
          </Grid>
          {errorText ? (
            <FormHelperText id="component-helper-text">
              {errorText}
            </FormHelperText>
          ) : null}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Remember me"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

/* MAPSTATETOPROPS */
function mapStateToProps(state, ownProps) {
  return {
    auth: state.authReducer
  };
}

export default connect(mapStateToProps)(SignIn);
