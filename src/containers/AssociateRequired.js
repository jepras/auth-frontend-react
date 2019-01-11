import React from "react";
import { connect } from "react-redux";
import { submitPhone, handleChangePhone } from "../actions/authActions";

// Material UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

class AssociateRequired extends React.Component {
  handleChangePhone = e => {
    const { dispatch } = this.props;
    dispatch(handleChangePhone(e.target.value));
  };

  handleSubmit = e => {
    const { dispatch } = this.props;
    e.preventDefault();
    dispatch(submitPhone());
  };

  render() {
    const { phone, errorText } = this.props.auth;

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Provide phone number
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={10}>
            <TextField
              required
              name="firstName"
              label="Phone Number"
              fullWidth
              autoComplete="uname"
              id="phone"
              onChange={this.handleChangePhone}
              value={phone ? phone : ""}
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
      /* <div>
        <h1>Input phone number</h1>
        {errorText ? <p>{errorText}</p> : null}
        <form className="c-todo__section" onSubmit={this.handleSubmit}>
          <input
            className="c-todo__input"
            type="text"
            id="phone"
            onChange={this.handleChangePhone}
            value={phone ? phone : ""}
          />

          <button type="submit" className="c-todo__icon">
            <i className="material-icons">assignment_returned</i>
          </button>
        </form>
      </div> */
    );
  }
}

/* MAPSTATETOPROPS */
function mapStateToProps(state, ownProps) {
  return {
    auth: state.authReducer
  };
}

export default connect(mapStateToProps)(AssociateRequired);
