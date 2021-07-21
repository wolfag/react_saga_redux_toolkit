import { IStudent, TOrder } from 'models';
import React, { ReactElement, MouseEvent, ChangeEvent } from 'react';
import TableHead from '@material-ui/core/TableHead';
import { Checkbox, makeStyles, TableCell, TableRow, TableSortLabel } from '@material-ui/core';

interface Props {
  numSelected: number;
  onRequestSort: (event: MouseEvent<unknown>, property: keyof IStudent) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order?: TOrder;
  orderBy?: string;
  rowCount: number;
}

interface HeadCell {
  id: keyof IStudent;
  disablePadding: boolean;
  label: string;
  numeric: boolean;
}

const useStyles = makeStyles((theme) => ({
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: '100',
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    to: 20,
    width: 1,
  },
}));

const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'gender',
    numeric: false,
    disablePadding: false,
    label: 'Gender',
  },
  {
    id: 'mark',
    numeric: true,
    disablePadding: false,
    label: 'Mark',
  },
  {
    id: 'city',
    numeric: false,
    disablePadding: false,
    label: 'City',
  },
];

export default function HeaderRow({
  numSelected,
  onRequestSort,
  onSelectAllClick,
  order,
  orderBy,
  rowCount,
}: Props): ReactElement {
  const classes = useStyles();

  const createSortHandler = (property: keyof IStudent) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };
  console.log({ orderBy });
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all student' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
            {orderBy === headCell.id ? (
              <span className={classes.visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </span>
            ) : null}
          </TableCell>
        ))}
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}
