import { Box, Checkbox, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { Delete, Edit } from '@material-ui/icons';
import { ICityMap, IStudent, TOrder } from 'models';
import React, { ChangeEvent, MouseEvent, ReactElement, useState } from 'react';
import { capitalizeString, getMarkColor } from 'utils';
import HeaderRow from './HeaderRow';

interface Props {
  studentList: IStudent[];
  cityMap: ICityMap;
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
}: Props): ReactElement {
  const classes = useStyles();
  const [selected, setSelected] = useState<(string | undefined)[]>([]);
  const [order, setOrder] = useState<TOrder>('asc');
  const [orderBy, setOrderBy] = useState<keyof IStudent>('name');

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

  return (
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
                      onRemove?.(student);
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
  );
}
