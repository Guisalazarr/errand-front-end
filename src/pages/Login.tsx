import { Button, Grid, IconButton, Link, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TitlePage from '../components/TitlePage';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { loginAction } from '../store/modules/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import AlertFeedback, { AlertFeedbackType } from '../components/AlertFeedback';
import { createTitle } from '../store/modules/titleSlice';

const Login: React.FC = () => {
  const userlogged = useSelector((state: RootState) => state.login);
  const titleRedux = useSelector((state: RootState) => state.title);

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [valid, setValid] = useState<boolean>(false);

  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState(AlertFeedbackType.success);

  const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  useEffect(() => {
    dispatch(createTitle({ title: 'Login' }));
  }, []);

  useEffect(() => {
    if (userlogged.id) {
      navigate('/home');
    }
  }, [userlogged]);

  useEffect(() => {
    if (email.length < 4 || password.length < 4) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [email, password]);

  const loginUserApi = async () => {
    if (!email.match(validEmail)) {
      returnError('E-mail is not valid');
      return;
    }

    const result = await dispatch(
      loginAction({
        email,
        password
      })
    );
    if (!result.payload.ok) {
      returnError(result.payload.message);
    }
  };

  const returnError = (message: string) => {
    setFeedback(AlertFeedbackType.error);
    setOpenAlert(true);
    setMessage(message);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TitlePage title={titleRedux.title}></TitlePage>
      </Grid>
      <Grid item xs={4}>
        <IconButton aria-label="delete" size="large">
          <GoogleIcon fontSize="large" color="secondary" />
        </IconButton>
      </Grid>
      <Grid item xs={4}>
        <IconButton aria-label="delete" size="large">
          <FacebookIcon fontSize="large" color="secondary" />
        </IconButton>
      </Grid>
      <Grid item xs={4}>
        <IconButton aria-label="delete" size="large">
          <TwitterIcon fontSize="large" color="secondary" />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          type="email"
          id="email-login"
          label="Digite seu e-mail"
          variant="outlined"
          color="secondary"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          type="password"
          id="password"
          label="Digite sua senha"
          variant="outlined"
          color="secondary"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          size="large"
          sx={{ paddingX: '80px' }}
          color="primary"
          onClick={loginUserApi}
          disabled={valid}
        >
          Entrar
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Link color="secondary" style={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>
          <Typography variant="body2" color="black">
            CADASTRE-SE
          </Typography>
        </Link>
      </Grid>
      <AlertFeedback
        message={message}
        open={openAlert}
        close={() => setOpenAlert(false)}
        feedback={feedback}
      ></AlertFeedback>
    </Grid>
  );
};

export default Login;
