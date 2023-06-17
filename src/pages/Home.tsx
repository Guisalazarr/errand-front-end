/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container/Container';
import TitlePage from '../components/TitlePage';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { Button, FormControl, Grid, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import ListErrands from '../components/ListErrands';
import { listErrandsAction, searchErrandAction } from '../store/modules/errandSlice';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import { ErrandStatus } from '../models/errands.models';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const userlogged = useSelector((state: RootState) => state.login);
  const errandsRedux = useSelector((state: RootState) => state.errands);
  const [search, setSearch] = useState('');
  const [valid, setValid] = useState(false);
  const [titlePage, setTitlePage] = useState('Lista de recados');

  useEffect(() => {
    const isLogged = !!userlogged.id;
    if (!isLogged) {
      navigate('/login');
    }
    listErrandApi(ErrandStatus.unarchived);
  }, []);

  useEffect(() => {
    if (search.length < 2) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [search]);

  const listErrandApi = async (status: ErrandStatus) => {
    await dispatch(
      listErrandsAction({
        id: userlogged.id,
        status: status
      })
    );
  };

  const searchErrandApi = async (title: string) => {
    await dispatch(
      searchErrandAction({
        id: userlogged.id,
        title: title
      })
    );
  };
  return (
    <>
      <Container>
        <Grid item xs={12}>
          <TitlePage title={titlePage} />
        </Grid>
        <Grid container spacing={2} sx={{ mt: '10px' }}>
          <Grid item xs={10}>
            <FormControl fullWidth variant="outlined" color="secondary">
              <OutlinedInput
                id="outlined-adornment-password"
                type="text"
                value={search}
                onChange={event => setSearch(event.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton aria-label="toggle password visibility" edge="start">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              sx={{ height: '100%' }}
              color="secondary"
              disabled={valid}
              onClick={() => searchErrandApi(search)}
              fullWidth
            >
              <TuneRoundedIcon />
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => listErrandApi(ErrandStatus.unarchived)}
            >
              Recados
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" fullWidth onClick={() => listErrandApi(ErrandStatus.archived)}>
              Arquivados
            </Button>
          </Grid>
        </Grid>
      </Container>
      <ListErrands data={errandsRedux} />
    </>
  );
};

export default Home;
