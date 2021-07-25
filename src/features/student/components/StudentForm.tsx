import { IStudent } from 'models';
import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button } from '@material-ui/core';
import { InputField, RadioGroupField } from 'components/FromFields';

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
        <InputField name="city" control={control} label="Full Name" />
        <Box mt={3}>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
