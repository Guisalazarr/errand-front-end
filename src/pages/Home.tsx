import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container/Container';
import TitlePage from '../components/TitlePage';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ListErrands from '../components/ListErrands';
import { listErrandsAction } from '../store/modules/errandSlice';
import AlertFeedback from '../components/AlertFeedback';
import { RootState } from '../store';

const Home: React.FC = () => {
  const dispatch = useDispatch<any>();
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState('');

  const userlogged = useSelector((state: RootState) => state.login);
  const errandsRedux = useSelector((state: RootState) => state.errands);

  useEffect(() => {
    if (!userlogged) {
      setOpenAlert(true);
      setMessage('User was not found');
    }
  }, [userlogged]);

  useEffect(() => {
    listErrandApi();
  }, [errandsRedux]);

  const listErrandApi = async () => {
    const result = await dispatch(
      listErrandsAction({
        id: userlogged.id
      })
    );
  };

  return (
    <>
      <Container>
        <Grid item xs={12}>
          <TitlePage title={'Lista de recados'} />
          <ListErrands />
          <AlertFeedback message={message} open={openAlert} close={() => setOpenAlert(false)}></AlertFeedback>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
