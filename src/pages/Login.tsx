import { Button, Grid, IconButton, Link, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TitlePage from '../components/TitlePage';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { loginAction } from '../store/modules/loginSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const loginUserApi = async () => {
    const result = await dispatch(
      loginAction({
        email,
        password
      })
    );
    console.log(result.payload.ok);
    if (result.payload.ok) {
      navigate('/home');
    }
  };

  // const handleClear = () => {
  //   setEmail('');
  //   setPassword('');
  // };

  // const goHome = () => {
  //   const findUser = registerRedux.find(item => {
  //     return item.email === email && item.password === password;
  //   });
  //   if (findUser) {
  //     dispatch(createUserLogged({ name: findUser.name, email: findUser.email }));
  //     dispatch(setAllErrands(findUser ? findUser.errands : []));
  //     navigate('/home');
  //   } else {
  //     dispatch(createAlertSlice({ open: true, msg: 'Usuário ou senha inválida!', feedback: 'error' }));
  //   }
  //   handleClear();
  // };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TitlePage title={'LOGIN'}></TitlePage>
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
        <Button variant="contained" size="large" sx={{ paddingX: '80px' }} color="primary" onClick={loginUserApi}>
          Entrar
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Link color="secondary" style={{ cursor: 'pointer' }}>
          <Typography variant="body2" color="black">
            CADASTRE-SE
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );
};

export default Login;
