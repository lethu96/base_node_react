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
import { login } from '../actions/userAction';
import history from '../history';

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


class Login extends React.Component {
  handleSumbit = (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;

    const data = { email, password };
    this.props.onLogin(data);
  }
  render() {
    const { fetching, token, error } = this.props;
    if (token !== null && token !== undefined) {
      localStorage.setItem('token', token);
      this.props.history.push('/');

    }
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div >
          <Typography component="h1" variant="h5">
            Sign in
        </Typography>
          <form noValidate onSubmit={this.handleSumbit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign In
          </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
              </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
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

const mapStateToProps = (state) => {
  console.log(state);
  return {
    fetching: state.user.fetching,
    token: state.user.token,
    error: state.user.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (data) => dispatch(login(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);