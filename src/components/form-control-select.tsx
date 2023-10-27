import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type FormSelectProps = {
  name: string;
  values: string[];
  value: string | undefined;
  onChange: Function;
};

export const FormSelect = ({ name, value: current, values, onChange }: FormSelectProps) => {
  const [value, setValue] = useState(current || '');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setValue(event.target.value);
    onChange(name, event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 150 }} size="small">
      <InputLabel id={'select-label' + name}>{name}</InputLabel>
      <Select
        labelId={'select-label' + name}
        id="demo-select-small"
        value={value}
        label={name}
        onChange={handleChange}
      >
        {values.map((value: string, i: number) => (
          <MenuItem key={i} value={value}>
            {value
              .split('_')
              .map((w) => w[0].toUpperCase() + w.slice(1))
              .join(' ')}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
