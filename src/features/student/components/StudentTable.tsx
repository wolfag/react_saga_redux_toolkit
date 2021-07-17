import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Student } from 'models';
import React, { ReactElement } from 'react';

interface Props {
  studentList: Student[];
  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
}

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  edit: {
    marginRight: theme.spacing(1),
  },
  remove: {},
}));

export default function StudentTable({ studentList, onEdit, onRemove }: Props): ReactElement {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Gender</TableCell>
            <TableCell align="left">Mark</TableCell>
            <TableCell align="left">City</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map((student, idx) => (
            <TableRow key={student.id}>
              <TableCell align="center">{student.id}</TableCell>
              <TableCell align="left">{student.name}</TableCell>
              <TableCell align="left">{student.gender}</TableCell>
              <TableCell align="left">{student.mark}</TableCell>
              <TableCell align="left">{student.city}</TableCell>
              <TableCell align="right">
                <Button
                  className={classes.edit}
                  color="primary"
                  size="small"
                  onClick={() => {
                    onEdit?.(student);
                  }}
                >
                  Edit
                </Button>
                <Button
                  className={classes.remove}
                  color="secondary"
                  size="small"
                  onClick={() => {
                    onRemove?.(student);
                  }}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
