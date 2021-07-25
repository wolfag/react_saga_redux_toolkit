import { Box, Button } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { InputField, RadioGroupField, SelectField } from 'components/FromFields';
import { selectCityOptions } from 'features/city/citySlice';
import { IStudent } from 'models';
import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface Props {
  initialValues?: IStudent;
  onSubmit?: (formValues: IStudent) => void;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .test('two-words', 'Please enter at least two words', (value) =>
      !value ? true : `${value || ''}`?.split(' ').filter((x) => !!x).length >= 2
    ),
  age: yup
    .number()
    .positive()
    .integer()
    .min(18)
    .max(60)
    .required()
    .typeError('Please enter a valid number'),
  mark: yup.number().positive().min(0).max(10).required().typeError('Please enter a valid number'),
  gender: yup.string().oneOf(['male', 'female']).required(),
  city: yup.string().required(),
});

export function StudentForm({ initialValues, onSubmit }: Props): ReactElement {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IStudent>({ defaultValues: initialValues, resolver: yupResolver(schema) });

  const cityOptions = useAppSelector(selectCityOptions);

  const handleFormSubmit = (formValues: IStudent) => {
    console.log({ formValues });
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full Name" />
        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ]}
        />
        <InputField name="age" control={control} label="Age" />
        <InputField name="mark" control={control} label="Mark" />
        <SelectField name="city" control={control} label="City" options={cityOptions} />
        <Box mt={3}>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
