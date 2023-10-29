import { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { FormSelect } from './form-control-select';
import { RepoFilterParams } from '../interface/filter';

import log from '../lib/logger';

type RepoFiltersBarProps = {
  params: RepoFilterParams;
  text: string;
  onChange: (text: string, params: RepoFilterParams) => void;
};

type Timeout = ReturnType<typeof setTimeout> | null | undefined;

export const RepoFiltersBar = ({ params, text, onChange }: RepoFiltersBarProps) => {
  let keyupTimer: Timeout = null;
  const [regex, setRegex] = useState(text || '');

  const handleChange = (name: string, value: string) => {
    log({ name, value });
    if (name === 'text') {
      onChange(regex, params);
      return;
    }

    const _params = { ...params, [name]: value };
    onChange(regex, _params);
  };
  return (
    <Grid>
      <Box sx={{ mb: 1, display: 'flex', gap: 1 }} title="Fetch repos">
        <FormSelect
          name="Sort field"
          values={['created', 'updated', 'pushed', 'full_name']}
          value={params?.sort}
          onChange={handleChange}
        />
        <FormSelect
          name="Direction"
          values={['asc', 'desc']}
          value={params?.direction}
          onChange={handleChange}
        />
        <FormSelect
          name="Type"
          value={params?.type}
          values={['all', 'owner', 'member']}
          onChange={handleChange}
        />
        <TextField
          label="Filter results"
          placeholder="Search with regex in Name and Description fields"
          size="small"
          sx={{ flexGrow: 1 }}
          defaultValue={text}
          onChange={(e) => {
            setRegex(e.currentTarget?.value || '');
          }}
          onKeyUp={() => {
            if (keyupTimer) clearTimeout(keyupTimer);
            keyupTimer = setTimeout(() => handleChange('text', text), 500);
          }}
        />
      </Box>
    </Grid>
  );
};
