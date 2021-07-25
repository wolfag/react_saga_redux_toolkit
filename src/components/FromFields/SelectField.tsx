import { InputLabel, MenuItem, Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import React, { ReactElement } from 'react';
import { Control, useController } from 'react-hook-form';

export interface ISelectOptions {
  label: string;
  value: number | string;
}

interface Props {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: ISelectOptions[];
}

export function SelectField({ name, control, label, disabled, options }: Props): ReactElement {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({ name, control });

  return (
    <FormControl
      variant="outlined"
      size="small"
      fullWidth
      margin="normal"
      disabled={disabled}
      error={invalid}
    >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        {...{
          value,
          onChange,
          onBlur,
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
