import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface RadioOption {
  label?: string;
  value: string | number;
}
export interface RadioGroupFieldProps {
  label?: string;
  name: string;
  control: Control<any>;
  options: RadioOption[];
  disabled?: boolean;
}

export function RadioGroupField(props: RadioGroupFieldProps) {
  const { control, label, name, options, disabled } = props;
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({ name, control });
  return (
    <FormControl
      disabled={disabled}
      margin="normal"
      component="fieldset"
      error={invalid}
      fullWidth
    >
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup name={name} value={value} onChange={onChange} onBlur={onBlur}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      <FormHelperText>{error && error.message}</FormHelperText>
    </FormControl>
  );
}
