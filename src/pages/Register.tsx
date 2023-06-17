import React, { useEffect, useState } from 'react';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import TitlePage from '../components/TitlePage';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUserAction } from '../store/modules/userSlice';
import AlertFeedback, { AlertFeedbackType } from '../components/AlertFeedback';
import { createTitle } from '../store/modules/titleSlice';
import { RootState } from '../store';

const Index: React.FC = () => {
  const titleRedux = useSelector((state: RootState) => state.title);

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [valid, setValid] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState(AlertFeedbackType.success);

  useEffect(() => {
    dispatch(createTitle({ title: 'Criar Conta' }));
  }, []);

  useEffect(() => {
    if (name.length < 3 || email.length < 4 || password.length < 4 || repeatPassword.length < 4) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [name, email, password, repeatPassword]);

  const createUserApi = async () => {
    const result = await dispatch(
      createUserAction({
        name,
        email,
        password,
        repeatPassword
      })
    );
    if (!result.payload.ok) {
      returnMessageAlert(AlertFeedbackType.error, result.payload.message);
      return;
    }
    returnMessageAlert(AlertFeedbackType.success, result.payload.message);

    setTimeout(() => {
      navigate('/home');
    }, 2000);
  };

  const returnMessageAlert = (alert: AlertFeedbackType, message: string) => {
    setFeedback(alert);
    setMessage(message);
    setOpenAlert(true);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TitlePage title={titleRedux.title}></TitlePage>
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
          <Button variant="contained" color="primary" size="large" onClick={createUserApi} disabled={valid}>
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
        <AlertFeedback
          message={message}
          open={openAlert}
          close={() => setOpenAlert(false)}
          feedback={feedback}
        ></AlertFeedback>
      </Grid>
    </>
  );
};

export default Index;
