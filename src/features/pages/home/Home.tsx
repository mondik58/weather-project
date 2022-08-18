import {useEffect} from 'react';
import {Container} from '@mui/system';
import {Box, CircularProgress, Typography} from '@mui/material';
import SearchCity from '../../searchCity';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {
  currentWeatherAsync,
  DataWeatherResponse,
} from '../../card/currentWeatherSlice';
import {SearchData} from '../../searchCity/SearchCity';
import CurrentWeatherCard from '../../card/CurrentWeatherCard';

const Home = () => {
  const dispatch = useAppDispatch();
  const {data, loading} = useAppSelector((state) => state.currentWeather);

  useEffect(() => {
    const dataStorage = JSON.parse(localStorage.getItem('allCities') || '{}');

    Object.values(dataStorage).forEach((item: any) => {
      const [lat, lon] = item ? item.value.split(' ') : ['', ''];
      dispatch(
        currentWeatherAsync({lat, lon, searchId: item ? item.id : undefined})
      );
    });
  }, []);

  const handleOnSearchChange = (searchData: SearchData | null) => {
    const [lat, lon] = searchData ? searchData.value.split(' ') : ['', ''];
    dispatch(
      currentWeatherAsync({
        lat,
        lon,
        searchId: searchData ? searchData.id : undefined,
      })
    );
  };

  return (
    <Container maxWidth='lg' sx={{height: '100%'}}>
      <Box sx={{width: '100%', pt: 2}}>
        <SearchCity onSearchChange={handleOnSearchChange} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 4,
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : data.length > 0 ? (
          data.map((item: DataWeatherResponse, index: number) => {
            return <CurrentWeatherCard key={index} data={item} />;
          })
        ) : (
          <Typography sx={{fontSize: 25, mb: 0}} color='#333' gutterBottom>
            Select City
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Home;
