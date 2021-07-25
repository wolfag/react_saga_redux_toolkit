import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { ReactElement } from 'react';
import { Control, useController } from 'react-hook-form';
import FormHelperText from '@material-ui/core/FormHelperText';

export interface IRadioOptions {
  label: string;
  value: number | string;
}

interface Props {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: IRadioOptions[];
}

export function RadioGroupField({ name, control, label, disabled, options }: Props): ReactElement {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({ name, control });

  return (
    <FormControl component="fieldset" error={invalid}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup {...{ name, value, onChange, onBlur }}>
        {options.map((option) => (
          <FormControlLabel key={option.value} control={<Radio />} {...option} />
        ))}
      </RadioGroup>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
