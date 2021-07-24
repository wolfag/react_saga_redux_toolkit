import { TextField } from '@material-ui/core';
import React, { InputHTMLAttributes, ReactElement } from 'react';
import { Control, useController } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}

export function InputField({ name, control, label, ...inputProps }: Props): ReactElement {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({ name, control });

  return (
    <div>
      <TextField
        size="small"
        fullWidth
        margin="normal"
        value={value}
        onChange={onChange}
        label={label}
        variant="outlined"
        inputRef={ref}
        error={invalid}
        helperText={error?.message}
        inputProps={inputProps}
      />
    </div>
  );
}
