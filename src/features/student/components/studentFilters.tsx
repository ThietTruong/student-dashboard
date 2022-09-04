import { Search } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';
import { City, ListParams } from '../../../models';

export interface StudentFiltersProps {
  filter: ListParams;
  cityList: City[];
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function StudentFilters(props: StudentFiltersProps) {
  const { filter, onSearchChange, cityList, onChange } = props;
  const searchInputRef = React.useRef<HTMLInputElement>();
  const handleSeachChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      name_like: e.target.value,
    };
    onSearchChange(newFilter);
  };
  const handleCityChange = (e: SelectChangeEvent<string>) => {
    if (!onChange) return;
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      city: e.target.value || undefined,
    };
    onChange(newFilter);
  };

  const handleSortChange = (e: SelectChangeEvent<string>) => {
    if (!onChange) return;
    const value = e.target.value;
    const [_sort, _order] = value.split('.');
    const newFilter: ListParams = {
      ...filter,
      _order: (_order as 'asc' | 'desc') || undefined,
      _sort: _sort || undefined,
    };
    onChange(newFilter);
  };
  const handleClearFilter = () => {
    if (!onChange) return;
    const newFilter: ListParams = {
      ...filter,
      _order: undefined,
      _sort: undefined,
      name_like: undefined,
      city: undefined,
    };
    onChange(newFilter);
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
  };
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Search by name</InputLabel>
            <OutlinedInput
              id="searchByName"
              label="Search by name"
              endAdornment={<Search />}
              onChange={handleSeachChange}
              inputRef={searchInputRef}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="filterByCity">Filter by city</InputLabel>
            <Select
              labelId="filterByCity"
              label="Filter by city"
              value={filter.city || ''}
              onChange={handleCityChange}
            >
              <MenuItem value="">
                <em>all</em>
              </MenuItem>

              {cityList.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="sortBy">Sort</InputLabel>
            <Select
              labelId="sortBy"
              label="Sort"
              value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
              onChange={handleSortChange}
            >
              <MenuItem value="">
                <em>none</em>
              </MenuItem>
              <MenuItem value="name.asc">Name ASC</MenuItem>
              <MenuItem value="name.desc">Name DESC</MenuItem>

              <MenuItem value="city.asc">City ASC</MenuItem>

              <MenuItem value="city.desc">City DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={1}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={handleClearFilter}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
