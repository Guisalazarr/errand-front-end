import React, { useEffect, useState } from 'react';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import TitlePage from '../components/TitlePage';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUserAction } from '../store/modules/userSlice';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const createUserApi = async () => {
    const result = await dispatch(
      createUserAction({
        name,
        email,
        password,
        repeatPassword
      })
    );
    handleClear();
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setPassword('');
    setRepeatPassword('');
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TitlePage title={'CRIAR CONTA'}></TitlePage>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="text"
            id="name"
            label="Nome"
            variant="outlined"
            color="secondary"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="email"
            id="email-login"
            label="E-mail"
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
            label="Senha"
            variant="outlined"
            color="secondary"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="password"
            id="repeat-password"
            label="Repita a senha"
            variant="outlined"
            color="secondary"
            value={repeatPassword}
            onChange={event => setRepeatPassword(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" size="large" onClick={createUserApi}>
            Cadastre-se
          </Button>
          <Grid item xs={12} sx={{ marginTop: '10px' }}>
            <Link color="secondary" style={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>
              <Typography variant="body2" color="black">
                JÁ TENHO CONTA
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Index;
