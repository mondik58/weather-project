import {FC, useState} from 'react';
import {AsyncPaginate} from 'react-select-async-paginate';
import {Grid, Container} from '@mui/material';

import {geoApiOptions, GEO_API_URL} from '../../constants/api';
import {addCities} from '../../utils/localStorage';

interface City {
  id: number;
  latitude: string;
  longitude: string;
  name: string;
  countryCode: string;
}

export interface SearchData {
  id: number;
  value: string;
  name: string;
}

interface SearchCity {
  onSearchChange: (searchData: SearchData | null) => void;
}

const SearchCity: FC<SearchCity> = ({onSearchChange}) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue: string) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city: City) => {
            return {
              id: city.id,
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name} ${city.countryCode} `,
            };
          }),
        };
      });
  };

  const handleOnChange = (searchData: SearchData | null) => {
    onSearchChange(searchData);
    if (searchData) addCities(searchData);
  };

  return (
    <>
      <Container maxWidth='lg'>
        <Grid
          container
          direction='column'
          justifyContent='center'
          alignItems='center'
        >
          <Grid item xs={12} sx={{width: '100%'}}>
            <AsyncPaginate
              placeholder='Search for city'
              debounceTimeout={600}
              value={search}
              onChange={handleOnChange}
              loadOptions={loadOptions}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SearchCity;
