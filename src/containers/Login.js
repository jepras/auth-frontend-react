import React from "react";
import { connect } from "react-redux";
import SignIn from "./SignIn";
import AssociateRequired from "./AssociateRequired";
import SmsCode from "./SmsCode";
import Success from "./Success";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
/* import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review"; */

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
});

function getStepContent(step) {
  switch (step) {
    case 0:
      return <SignIn />;
    case 1:
      return <AssociateRequired />;
    case 2:
      return <SmsCode />;
    case 3:
      return <Success />;
    default:
      throw new Error("Unknown step");
  }
}

const steps = ["Login", "Enter number", "Enter SMS"];

class Login extends React.Component {
  render() {
    const { activeStep } = this.props.auth;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Login
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Success!
                  </Typography>
                  <Typography variant="subtitle1">
                    Now redirecting to your profile page..
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
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

export default connect(mapStateToProps)(withStyles(styles)(Login));
