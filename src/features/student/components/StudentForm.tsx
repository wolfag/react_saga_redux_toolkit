import { Box, Button } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { InputField, RadioGroupField, SelectField } from 'components/FromFields';
import { selectCityOptions } from 'features/city/citySlice';
import { IStudent } from 'models';
import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface Props {
  initialValues?: IStudent;
  onSubmit?: (formValues: IStudent) => void;
}

type FormData = {
  firstName: string;
  lastName: string;
};

const schema = yup.object().shape({
  firstName: yup.string().required(),
  age: yup.number().positive().integer().required(),
});

export function StudentForm({ initialValues, onSubmit }: Props): ReactElement {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IStudent>({ defaultValues: initialValues });

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
        <InputField name="age" control={control} label="Full Name" />
        <InputField name="mark" control={control} label="Full Name" />
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
