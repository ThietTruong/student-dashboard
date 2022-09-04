import { Alert, Box, Button, CircularProgress } from '@mui/material';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../../app/hooks';
import { InputField } from '../../../components/formFields/inputField';
import { RadioGroupField } from '../../../components/formFields/radioGroupField';
import { SelectField } from '../../../components/formFields/selectField';

import { Student } from '../../../models/student';
import { selectCityOptions } from '../../city/city.slice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export interface StudentFormProps {
  initialValues: Student;
  onSubmit?: (formValues: Student) => void;
}

export default function StudentForm(props: StudentFormProps) {
  const schema = yup.object().shape({
    name: yup.string().required('Please enter name.'),
    age: yup
      .number()
      .positive('Please enter a positive number.')
      .integer('Please enter an integer.')
      .required('Please enter age.')
      .typeError(
        'Please enter a valid number, You, seconds ago Uncommitted changes'
      ),
    mark: yup
      .number()
      .min(0, 'Min is 0')
      .max(10, 'Max is 10')
      .required('Please enter mark.')
      .typeError('Please enter a valid number.'),
    gender: yup
      .string()
      .oneOf(['male', 'female'], 'Please select either male or female.')
      .required('Please select gender.'),
    city: yup.string().required('Please select city.'),
  });
  const { initialValues, onSubmit } = props;
  const [error, setError] = React.useState<string>();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const handleFormSubmit = async (formValues: Student) => {
    if (!onSubmit) return;
    try {
      setError('');
      await onSubmit(formValues);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      console.log('Fail to submit', error);
    }
  };
  const cityOptions = useAppSelector(selectCityOptions);

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" lable="Full name" control={control} />
        <InputField name="age" lable="Age" control={control} />
        <RadioGroupField
          name="gender"
          label="Gender"
          control={control}
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />
        <SelectField
          name="city"
          label="City"
          control={control}
          options={cityOptions}
        />
        <InputField name="mark" lable="Mark" control={control} />
        {error && <Alert severity="error">{error}</Alert>}
        <Box mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting && <CircularProgress size={16} color="secondary" />}{' '}
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
