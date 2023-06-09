import React, { useEffect, useMemo, useState } from 'react';
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
import ErrandType from '../types/ErrandType';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { deleteErrandAction } from '../store/modules/errandSlice';

const ListErrands = () => {
  const errandsRedux = useSelector((state: RootState) => state.errands);
  const userlogged = useSelector((state: RootState) => state.login);

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [idDelete, setIdDelete] = useState<string>('');

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogItem, setdialogItem] = useState<ErrandType>();

  const deleteErrandApi = async () => {
    const result = await dispatch(
      deleteErrandAction({
        id: userlogged.id,
        errandId: idDelete
      })
    );
    setOpenDialog(false);
  };

  const confirmDelete = (errand: ErrandType) => {
    setOpenDialog(true);
    setdialogItem(errand);
    setIdDelete(errand.id);
  };

  const handleEdit = (errand: ErrandType) => {
    navigate(`/errands/${errand.id}`);
  };

  const listMemo = useMemo(() => {
    return errandsRedux.map((errand, index: number) => {
      return (
        <React.Fragment key={errand.id}>
          <ListItem
            sx={{ maxWidth: '100%', padding: '1rem', borderRadius: '5px' }}
            disableGutters
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  sx={{ marginRight: '10px' }}
                  onClick={() => handleEdit(errand)}
                >
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
  }, [errandsRedux]);

  return (
    <>
      <List>{listMemo} </List>

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
    </>
  );
};

export default ListErrands;
