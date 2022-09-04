import { TextField } from '@mui/material';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  lable?: string;
  name: string;
  control: Control<any>;
}

export function InputField(props: InputFieldProps) {
  const { control, lable, name, ...inputProps } = props;
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({ name, control });
  return (
    <TextField
      fullWidth
      size="small"
      margin="normal"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      label={lable}
      variant="outlined"
      inputRef={ref}
      error={invalid}
      helperText={error && error.message}
      inputProps={inputProps}
    />
  );
}
