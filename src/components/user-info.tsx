import { useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/ModeEdit';
import { ModalUserForm } from './modal-user-form';
import { GithubUser } from '../interface/github';
import log from '../lib/logger';

type UserInfoCardProps = {
  userInfo?: GithubUser;
  onChangeUser: Function;
};

export const UserInfoCard = ({ userInfo, onChangeUser }: UserInfoCardProps) => {
  const [openDlg, setOpenDialog] = useState(false);

  log('UserInfoCard', userInfo);

  return (
    <>
      <Card sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography variant="h2" component="div">
              {userInfo?.name || ''}
            </Typography>
            <Typography>
              <span>Login name:</span>
              <strong> {userInfo?.login}</strong>
            </Typography>
            <Typography>
              <span>Public Repos:</span>
              <strong> {userInfo?.public_repos}</strong>
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              endIcon={<EditIcon />}
              onClick={() => {
                setOpenDialog(true);
              }}
            >
              Change User
            </Button>
          </CardActions>
        </Box>
        <CardMedia sx={{ m: 2, display: 'flex' }}>
          <Avatar
            alt="githib avatar"
            src={userInfo?.avatar_url}
            sx={{ height: 180, width: 180, justifySelf: 'center' }}
          ></Avatar>
        </CardMedia>
      </Card>
      {userInfo?.login?.length ? (
        <ModalUserForm
          user={userInfo.login}
          open={openDlg}
          onUpdate={(newUser) => {
            setOpenDialog(false);
            onChangeUser(newUser);
          }}
        />
      ) : null}
    </>
  );
};
