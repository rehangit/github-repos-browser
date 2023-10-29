import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';

import { RepoTable } from '../components/repo-table';
import { getGithubUser } from '../lib/github';
import { GithubUser } from '../interface/github';
import { UserInfoCard } from '../components/user-info';
import { RepoFiltersBar } from '../components/repo-filters-bar';
import { RepoFilterParams } from '../interface/filter';
import log from '../lib/logger';

export const Repos = () => {
  const [user, setUser] = useState('microsoft');
  const [userInfo, setUserInfo] = useState<GithubUser>();
  const [repoParams, setRepoParams] = useState<RepoFilterParams>({
    sort: 'full_name',
    direction: 'asc',
    type: 'all',
  });

  const [textFilter, setTextFilter] = useState<string>('');

  useEffect(() => {
    getGithubUser(user).then((data) => {
      setUserInfo(data as GithubUser);
    });
  }, [user]);

  const handleRepoFilterChange = (text: string, params: RepoFilterParams) => {
    log('on change handler', { text, params });
    setTextFilter(text);
    setRepoParams(params);
  };

  return (
    <Container>
      <UserInfoCard
        userInfo={userInfo}
        onChangeUser={(newUser: string) => {
          setUser(newUser);
        }}
      />
      <RepoFiltersBar params={repoParams!} text={textFilter} onChange={handleRepoFilterChange} />
      <RepoTable user={user} textFilter={textFilter} repoParams={repoParams!} />
    </Container>
  );
};
