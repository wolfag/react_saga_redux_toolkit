import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useAppSelector } from 'app/hooks';
import { InputField, RadioGroupField, SelectField } from 'components/FromFields';
import { selectCityOptions } from 'features/city/citySlice';
import { IStudent } from 'models';
import React, { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
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
    formState: { isSubmitting },
  } = useForm<IStudent>({ defaultValues: initialValues, resolver: yupResolver(schema) });
  const [error, setError] = useState<string>('');

  const cityOptions = useAppSelector(selectCityOptions);

  const handleFormSubmit = async (formValues: IStudent) => {
    try {
      setError('');
      await onSubmit?.(formValues);
    } catch (error) {
      console.log({ 'failed to add/update student': { ...error } });
      setError(error.message);
    }
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
        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField name="city" control={control} label="City" options={cityOptions} />
        )}

        {error && <Alert severity="error">{error}</Alert>}

        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            startIcon={isSubmitting && <CircularProgress size={20} color="secondary" />}
            disabled={isSubmitting}
          >
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
