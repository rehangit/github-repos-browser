import { TextField, Typography } from '@mui/material';
import { Box } from '@mui/material';
import { FormSelect } from './form-control-select';
import { useState } from 'react';

type RepoFiltersProps = {
  filters: any;
  onFiltersChange: Function;
};

export const RepoFilters = ({ filters, onFiltersChange }: RepoFiltersProps) => {
  const [name, setName] = useState(filters?.Name || '');
  const handleChange = (name: string, value: string) => {
    onFiltersChange({ ...filters, [name]: value });
  };
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Repositories
      </Typography>
      <Box sx={{ mb: 1, display: 'flex', gap: 1 }}>
        <TextField
          label="Name"
          size="small"
          sx={{ flexGrow: 1 }}
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
          onBlur={(e) => {
            handleChange('Name', e.currentTarget.value);
          }}
          onKeyUp={(e) => {
            setTimeout(() => handleChange('Name', name), 500);
          }}
        />
        <FormSelect
          name="Type"
          value={filters.type as string}
          values={['all', 'owner', 'member']}
          onChange={handleChange}
        />
        <FormSelect
          name="Sort"
          values={['created', 'updated', 'pushed', 'full_name']}
          value={filters.sort}
          onChange={handleChange}
        />
        <FormSelect
          name="Direction"
          values={['asc', 'desc']}
          value={filters.direction}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};
