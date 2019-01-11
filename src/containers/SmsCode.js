import React from "react";
import { connect } from "react-redux";
import { submitSms, handleChangeSms } from "../actions/authActions";

// Material UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

class SmsCode extends React.Component {
  handleChangeSms = e => {
    const { dispatch } = this.props;
    dispatch(handleChangeSms(e.target.value));
  };

  handleSubmit = e => {
    const { dispatch } = this.props;
    e.preventDefault();
    dispatch(submitSms());
  };

  render() {
    const { binding_code, errorText } = this.props.auth;

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Check your phone for the SMS code we have sent
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={10}>
            <TextField
              required
              name="firstName"
              label="SMS code"
              fullWidth
              autoComplete="uname"
              id="sms"
              onChange={this.handleChangeSms}
              value={binding_code ? binding_code : ""}
            />{" "}
            {errorText ? (
              <FormHelperText id="component-helper-text">
                Not supported phone format
              </FormHelperText>
            ) : null}
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

export default connect(mapStateToProps)(SmsCode);
