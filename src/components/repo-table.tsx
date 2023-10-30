import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Link from '@mui/material/Link';

import { getGithubRepos } from '../lib/github';
import { GithubRepo } from '../interface/github';
import { RepoFilterParams } from '../interface/filter';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    filterable: true,
    minWidth: 300,
    renderCell: ({ row, value }) => {
      const url = row?.html_url || '';
      return (
        <Link underline="hover" href={url}>
          {value}
        </Link>
      );
    },
  },
  { field: 'stargazers_count', headerName: '☆' },
  { field: 'open_issues_count', headerName: '⊙' },
  { field: 'forks_count', headerName: '⑃' },
  { field: 'description', headerName: 'Description', flex: 1 },
];

type RepoTableProps = {
  user: string;
  textFilter?: string;
  repoParams: RepoFilterParams;
};

export const RepoTable = ({ user, textFilter, repoParams }: RepoTableProps) => {
  const [pageSize, setPageSize] = useState(10);

  const [repos, setRepos] = useState<GithubRepo[]>([]);

  useEffect(() => {
    getGithubRepos(user, repoParams).then((data) => {
      setRepos(data);
    });
  }, [user, repoParams]);

  return (
    <DataGrid
      sx={{ minHeight: 30 }}
      columns={columns}
      rows={
        textFilter
          ? repos.filter((r) => !!`${r.name} ${r.description}`.match(new RegExp(textFilter, 'i')))
          : repos
      }
      pageSizeOptions={[10, 30, 100]}
      autoPageSize={false}
      onPaginationModelChange={(ev) => {
        setPageSize(ev.pageSize);
      }}
      initialState={{
        pagination: { paginationModel: { pageSize } },
      }}
    />
  );
};
