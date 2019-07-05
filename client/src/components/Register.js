import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { register } from '../actions/userAction';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { stat } from 'fs';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {' team.'}
    </Typography>
  );
}


class Register extends React.Component {

  handleSumbit = (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let username = e.target.username.value;
    let email = e.target.email.value;
    let password = e.target.password.value;

    const data = { name, username, email, password }
    this.props.onRegister(data);
  }

  render() {
    const { fetching, user, error } = this.props;

    if (user !== null && user !== undefined)
      return (<SnackbarContent
        message={'Register Success'} />);
    if (error !== null && error !== undefined) {
      return (<SnackbarContent
        message={error} />);
    }
    return (
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <div >
          <Typography component="h1" variant="h5">
            Sign up
        </Typography>
          <form onSubmit={this.handleSumbit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label=" Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="User name"
                  name="username"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>

            </Grid>
            <Button
              type='submit'
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign Up
          </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
              </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <MadeWithLove />
        </Box>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  console.log('statetgytfytf', state)
  return {
    fetching: state.fetching,
    user: state.user.user,
    error: state.user.error
  }
}

const mapDispatchToProps = dispacth => {
  return {
    onRegister: (user) => dispacth(register(user))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register)