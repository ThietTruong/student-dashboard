import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Student } from '../../../models/student';
import { makeStyles } from '@mui/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { capitalizaString, getMarkColor } from '../../../utils';
import { Box } from '@mui/system';
import { City } from '../../../models';

export interface StudentTableProps {
  studentList: Student[];
  cityMap: {
    [key: string]: City;
  };
  onRemove?: (student: Student) => Promise<void>;
  onEdit?: (student: Student) => Promise<void>;
}
const useStyle = makeStyles(() => ({
  table: {
    // maxWidth: 650,
  },
  actionContainer: {
    display: 'flex',
  },
  edit: {
    marginRight: '12px',
  },
}));

export default function StudentTable(props: StudentTableProps) {
  const { studentList, cityMap, onRemove, onEdit } = props;
  const classes = useStyle();
  const [selectedStudent, setSelectedStudent] = React.useState<Student>();
  const [open, setOpen] = React.useState<boolean>(false);
  const renderNameCity = (code: string) => {
    if (cityMap[code]) {
      return cityMap[code].name;
    }
    return '';
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (student: Student) => {
    //set Select student
    setSelectedStudent(student);
    //Show comfirm dialog
    setOpen(true);
  };

  const handleRemoveConfirm = (student: Student) => {
    if (!onRemove) return '';
    if (student !== undefined) {
      onRemove(student);
    }
    setOpen(false);
  };

  const handleEditStudent = (student: Student) => {
    if (!onEdit || student == undefined) return;
    onEdit(student);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" size="small" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList &&
              studentList.map((student, index) => (
                <TableRow
                  key={student.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell width={150} component="th" scope="row">
                    {student.id}
                  </TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{capitalizaString(student.gender)}</TableCell>

                  <TableCell>
                    <Box color={getMarkColor(Number(student.mark))}>
                      {student.mark}
                    </Box>
                  </TableCell>
                  <TableCell>{renderNameCity(student.city)}</TableCell>

                  <TableCell align="center" className={classes.actionContainer}>
                    <Button
                      size="small"
                      color="primary"
                      style={{
                        marginRight: '12px',
                      }}
                      onClick={() => handleEditStudent(student)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      variant="contained"
                      onClick={() => handleRemoveClick(student)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove student name "
            {selectedStudent && selectedStudent.name}"". This is action
            can&apos;t be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            autoFocus
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleRemoveConfirm(selectedStudent as Student)}
            color="secondary"
            variant="contained"
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
