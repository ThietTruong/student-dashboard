import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import studentApi from '../../../api/studentApi';
import { Student } from '../../../models/student';
import StudentForm from '../components/studentForm';

export interface AddEditPageProps {}

export default function AddEditPage(props: AddEditPageProps) {
  const { studentId } = useParams();
  const [student, setStudent] = React.useState<Student>();
  const isEdit = Boolean(student);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (studentId) {
      fetchStudent(studentId);
    }
  }, [studentId]);

  async function fetchStudent(studentId: string) {
    try {
      const reponse = await studentApi.getById(studentId);
      console.log(reponse);
      setStudent(reponse);
    } catch (error) {
      console.log('Fail to fetch student', error);
    }
  }
  const initialValues: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student;
  const handleStudentFormSubmit = async (formValues: Student) => {
    if (isEdit) {
      await studentApi.update(formValues);
    } else {
      await studentApi.add(formValues);
    }
    throw new Error('My testing errors');
    navigate('/admin/students');
  };
  return (
    <Box>
      <Link to="/admin/students">
        <Typography
          variant="caption"
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Back to student list
        </Typography>
      </Link>
      <Typography variant="h4">
        {isEdit ? 'Update student infor' : 'Add new student'}
      </Typography>
      {!isEdit ||
        (Boolean(student) && (
          <Box mt={3}>
            <StudentForm
              initialValues={initialValues}
              onSubmit={handleStudentFormSubmit}
            />
          </Box>
        ))}
    </Box>
  );
}
