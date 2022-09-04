import * as React from 'react';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select from '@mui/material/Select';
import { Control, useController } from 'react-hook-form';

export interface SelectOption {
  label?: string;
  value: string | number;
}
export interface SelectFieldProps {
  label?: string;
  name: string;
  control: Control<any>;
  options: SelectOption[];
  disabled?: boolean;
}

export function SelectField(props: SelectFieldProps) {
  const { control, label, name, options, disabled } = props;
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({ name, control });
  return (
    <FormControl variant="outlined" size="small" fullWidth>
      <InputLabel id={`${label}_label`}>{label}</InputLabel>
      <Select
        labelId={`${label}_label`}
        label="Sort"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
