import { DataGrid, GridRowProps, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { getGithubRepos } from '../lib/github';
import { Link } from '@mui/material';

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
  { field: 'issues_count', headerName: '⊙' },
  { field: 'forks_count', headerName: '⑃' },
  { field: 'description', headerName: 'Description', flex: 1 },
];

type RepoTableProps = {
  user: string;
  filters: { [k: string]: string };
};

export const RepoTable = ({ user, filters }: RepoTableProps) => {
  const [pageSize, setPageSize] = useState(10);

  const [repos, setRepos] = useState<GridRowProps[]>([]);

  useEffect(() => {
    getGithubRepos(
      user,
      filters.Name,
      filters?.Type as any,
      filters?.Sort as any,
      filters?.Direction as any
    ).then((data) => {
      setRepos(data.map((row) => row as unknown as GridRowProps));
    });
  }, [user, filters]);

  return (
    <DataGrid
      style={{ minHeight: '30vh' }}
      columns={columns}
      rows={repos}
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
