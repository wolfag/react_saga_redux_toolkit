import { Box, FormControl, Grid, InputLabel, makeStyles, OutlinedInput } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { ICity, IListParams } from 'models';
import React, { ChangeEvent, ReactElement } from 'react';

interface Props {
  filter: IListParams;
  cityList: ICity[];
  onChange?: (newFilter: IListParams) => void;
  onSearchChange?: (newFilter: IListParams) => void;
}

export default function StudentFilters({
  filter,
  cityList,
  onChange,
  onSearchChange,
}: Props): ReactElement {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    const newFilter = {
      ...filter,
      name_like: e.target.value,
    };
    onSearchChange(newFilter);
  };

  return (
    <Box>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel htmlFor="searchByName">Search by name</InputLabel>
          <OutlinedInput
            id="searchByName"
            label="Search by name"
            onChange={handleSearchChange}
            endAdornment={<Search />}
            defaultValue={filter.name_like}
          />
        </FormControl>
      </Grid>
    </Box>
  );
}
