import { useEffect, useState } from 'react';
import { Container } from '@mui/material';

import { RepoTable } from '../components/repo-table';
import { getGithubUser } from '../lib/github';
import { GithubUser } from '../interface/github';
import { UserInfoCard } from '../components/user-info';
import { RepoFilters } from '../components/repo-filters';
import log from '../lib/logger';

export const Repos = () => {
  const [user, setUser] = useState('microsoft');
  const [userInfo, setUserInfo] = useState<GithubUser>();
  const [filters, setFilters] = useState({});

  useEffect(() => {
    getGithubUser(user).then((data) => {
      setUserInfo(data as GithubUser);
    });
  }, [user]);

  useEffect(() => {
    log('Repos filters changed', { filters });
  }, [filters]);

  return (
    <Container fixed maxWidth="lg">
      <UserInfoCard
        userInfo={userInfo}
        onChangeUser={(newUser: string) => {
          setUser(newUser);
        }}
      />
      <RepoFilters filters={filters} onFiltersChange={setFilters} />
      <RepoTable user={user} filters={filters} />
    </Container>
  );
};
