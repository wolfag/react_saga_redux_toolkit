import { Box, Button, Checkbox, IconButton } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { Delete, Edit } from '@material-ui/icons';
import { ICityMap, IListParams, IStudent, TOrder } from 'models';
import React, { ChangeEvent, MouseEvent, ReactElement, useEffect, useState } from 'react';
import { capitalizeString, getMarkColor } from 'utils';
import HeaderRow from './HeaderRow';

interface Props {
  studentList: IStudent[];
  cityMap: ICityMap;
  filter: IListParams;
  onEdit?: (student: IStudent) => void;
  onRemove?: (student: IStudent) => void;
  onSort?: (order: TOrder, property: keyof IStudent) => void;
}

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 750,
  },
  container: {
    maxHeight: 500,
  },
  edit: {
    marginRight: theme.spacing(1),
  },
  remove: {},
}));

export default function StudentTable({
  studentList,
  cityMap,
  onEdit,
  onRemove,
  onSort,
  filter,
}: Props): ReactElement {
  const classes = useStyles();
  const [selected, setSelected] = useState<(string | undefined)[]>([]);
  const [order, setOrder] = useState<TOrder | undefined>(filter._order);
  const [orderBy, setOrderBy] = useState<string | undefined>(filter._sort);
  const [selectedStudent, setSelectedStudent] = useState<IStudent | undefined>(undefined);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOrder(filter._order);
    setOrderBy(filter._sort);
  }, [filter]);

  const isSelected = (id: string | undefined) => selected.indexOf(id) !== -1;

  const handleCheck =
    (id: string | undefined) => (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (!id) return;

      const newSelected = [...selected];
      const index = selected.indexOf(id);
      if (index === -1) {
        newSelected.push(id);
      } else {
        newSelected.splice(index, 1);
      }
      setSelected(newSelected);
    };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = studentList.map((item) => item.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleRequestSort = (event: MouseEvent<unknown>, property: keyof IStudent) => {
    const isAsc = orderBy === property && order === 'asc';
    const direction: TOrder = isAsc ? 'desc' : 'asc';
    setOrder(direction);
    setOrderBy(property);
    onSort?.(direction, property);
  };

  const handleRemoveClick = (student: IStudent) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleRemoveConfirm = () => {
    setOpen(false);
    onRemove?.(selectedStudent as IStudent);
  };

  return (
    <>
      <TableContainer className={classes.container}>
        <Table
          stickyHeader
          className={classes.table}
          aria-label="sticky enhanced table"
          size="medium"
        >
          <HeaderRow
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={studentList.length}
          />
          <TableBody>
            {studentList.map((student, idx) => {
              const isItemSelected = isSelected(student.id);
              const labelId = `enhanced-table-checkbox-${idx}`;
              return (
                <TableRow
                  key={student.id}
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      onChange={handleCheck(student.id)}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </TableCell>
                  <TableCell component="th" id={labelId} scope="row" padding="none">
                    {student.name}
                  </TableCell>
                  <TableCell align="left">{capitalizeString(student.gender)}</TableCell>
                  <TableCell align="right">
                    <Box color={getMarkColor(student.mark)} fontWeight="bold">
                      {student.mark}
                    </Box>
                  </TableCell>
                  <TableCell align="left">{cityMap[student.city]?.name}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      className={classes.edit}
                      color="primary"
                      size="small"
                      onClick={() => {
                        onEdit?.(student);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      className={classes.remove}
                      color="secondary"
                      size="small"
                      onClick={() => {
                        handleRemoveClick?.(student);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove a student?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove student named "{selectedStudent?.name}". This action can not be
            undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleRemoveConfirm} color="secondary" variant="contained" autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
