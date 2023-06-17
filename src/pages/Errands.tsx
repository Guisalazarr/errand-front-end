import { Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

import TitlePage from '../components/TitlePage';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { createErrandAction, updateErrandAction } from '../store/modules/errandSlice';
import AlertFeedback, { AlertFeedbackType } from '../components/AlertFeedback';

const Errands: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const userlogged = useSelector((state: RootState) => state.login);
  const { errandId } = useParams();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState(AlertFeedbackType.success);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(false);

  useEffect(() => {
    const isLogged = !!userlogged.id;
    if (!isLogged) {
      navigate('/login');
    }
    if (errandId) {
      setIsEdit(true);
    }
  }, []);

  useEffect(() => {
    if (title.length < 2 || description.length < 2) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [title, description]);

  const createErrandApi = async () => {
    const user = {
      id: userlogged.id,
      title,
      description
    };
    const result = await dispatch(createErrandAction(user));
    if (result.payload.ok) {
      setFeedback(AlertFeedbackType.success);
      setOpenAlert(true);
      setMessage(result.payload.message);
      navigate('/home');
    }
  };

  const updateErrandApi = async () => {
    if (!errandId) {
      return;
    }

    const userUpdate = { id: userlogged.id, errandId, title, description };
    const result = await dispatch(updateErrandAction(userUpdate));

    if (result.payload.ok) {
      setFeedback(AlertFeedbackType.success);
      setOpenAlert(true);
      setMessage(result.payload.message);
      navigate('/home');
    }
  };

  const handleClear = () => {
    setTitle('');
    setDescription('');
  };

  return (
    <>
      <Grid container spacing={1}>
        <TitlePage title={isEdit ? 'Edite o recado' : 'Cadastre um novo recado'} />

        <Grid item xs={12}>
          <TextField
            sx={{ my: '10px' }}
            value={title}
            onChange={event => setTitle(event.target.value)}
            fullWidth
            id="title"
            label="Digite um título"
            variant="outlined"
            color="secondary"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={{ my: '10px' }}
            value={description}
            onChange={event => setDescription(event.target.value)}
            fullWidth
            id="description"
            label="Digite uma descrição"
            variant="outlined"
            color="secondary"
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            disabled={valid}
            fullWidth
            variant="contained"
            sx={{ height: '50px' }}
            onClick={isEdit ? updateErrandApi : createErrandApi}
          >
            {isEdit ? 'Editar' : 'Cadastrar'}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth onClick={handleClear} color="secondary" variant="contained" sx={{ height: '50px' }}>
            Limpar
          </Button>
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

export default Errands;
