import { Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

import TitlePage from '../components/TitlePage';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { createErrandAction, updateErrandAction } from '../store/modules/errandSlice';

const Errands: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const userlogged = useSelector((state: RootState) => state.login);
  const { errandId } = useParams();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    if (errandId) {
      setIsEdit(true);
    }
  }, []);

  const createErrandApi = async () => {
    const id = userlogged.id;
    const result = await dispatch(createErrandAction({ id, title, description }));
    if (result.payload.ok) {
      navigate('/home');
    }
  };

  const updateErrandApi = async () => {
    if (!errandId) {
      return alert('Não tem');
    }
    const result = await dispatch(updateErrandAction({ id: userlogged.id, errandId, title, description }));
    if (result.payload.ok) {
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
      </Grid>
    </>
  );
};

export default Errands;
