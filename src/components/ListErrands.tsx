import React, { useMemo, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import DialogConfirm from './DaialogConfirm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { deleteErrandAction, updateErrandAction } from '../store/modules/errandSlice';
import { Errand, ErrandStatus } from '../models/errands.models';
import AlertFeedback, { AlertFeedbackType } from './AlertFeedback';
import TaskIcon from '@mui/icons-material/Task';
import { createTitle } from '../store/modules/titleSlice';

interface listErrandsProps {
  data: Errand[];
  title?: string;
}

const ListErrands = (props: listErrandsProps) => {
  const userlogged = useSelector((state: RootState) => state.login);

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [idDelete, setIdDelete] = useState<string>('');

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogItem, setdialogItem] = useState<Errand>();

  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState(AlertFeedbackType.success);

  const deleteErrandApi = async () => {
    const result = await dispatch(
      deleteErrandAction({
        id: userlogged.id,
        errandId: idDelete
      })
    );
    setOpenDialog(false);

    if (result.payload.ok) {
      returnSuccess(result.payload.message);
    }
  };

  const filedErrandApi = async (errand: Errand) => {
    let status = errand.status;
    let message = '';

    if (status === ErrandStatus.unarchived) {
      status = ErrandStatus.archived;
      message = 'Errand archived sucessfully';
    } else {
      status = ErrandStatus.unarchived;
      message = 'Errand unarchived sucessfully';
    }
    const result = await dispatch(
      updateErrandAction({
        id: userlogged.id,
        errandId: errand.id,
        status: status
      })
    );
    if (result.payload.ok) {
      returnSuccess(message);
      dispatch(createTitle({ title: 'Lista de Recados' }));
    }
  };

  const returnSuccess = (message: string) => {
    setFeedback(AlertFeedbackType.success);
    setMessage(message);
    setOpenAlert(true);
  };

  const confirmDelete = (errand: Errand) => {
    setOpenDialog(true);
    setdialogItem(errand);
    setIdDelete(errand.id);
  };

  const handleEdit = (errand: Errand) => {
    navigate(`/errands/${errand.id}`);
  };

  const listMemo = useMemo(() => {
    return props.data.map((errand, index) => {
      return (
        <React.Fragment key={errand.id}>
          <ListItem
            sx={{ maxWidth: '100%', padding: '1rem', borderRadius: '5px' }}
            disableGutters
            secondaryAction={
              <>
                <IconButton sx={{ marginRight: '10px' }} onClick={() => filedErrandApi(errand)}>
                  <TaskIcon />
                </IconButton>
                <IconButton sx={{ marginRight: '10px' }} onClick={() => handleEdit(errand)}>
                  <EditIcon color="secondary" />
                </IconButton>

                <IconButton aria-label="comment" onClick={() => confirmDelete(errand)}>
                  <DeleteIcon color="primary" />
                </IconButton>
              </>
            }
          >
            <ListItemAvatar sx={{ display: 'inline' }}>
              <Avatar sx={{ bgcolor: '#044040', color: '#c4cbb7' }}>{index + 1}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <Typography variant="h5">{errand.title}</Typography>
                  <Typography variant="body2">{errand.description}</Typography>
                </>
              }
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      );
    });
  }, [props.data]);

  return (
    <>
      <List>
        {props.data.length ? (
          listMemo
        ) : (
          <Typography variant="h6" sx={{ mt: '20px' }}>
            Nenhum recado encontrado.
          </Typography>
        )}
      </List>
      {
        <DialogConfirm
          actionConfirm={deleteErrandApi}
          actionCancel={() => setOpenDialog(false)}
          title="Deseja excluir este recado?"
          openDialog={openDialog}
          subtile={dialogItem ? dialogItem.title : ''}
          description={dialogItem ? dialogItem.description : ''}
        />
      }
      <AlertFeedback
        message={message}
        open={openAlert}
        close={() => setOpenAlert(false)}
        feedback={feedback}
      ></AlertFeedback>
    </>
  );
};

export default ListErrands;
