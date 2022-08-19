import {useEffect} from 'react';
import {CircularProgress} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {useParams} from 'react-router-dom';
import {forecastWeatherSliceAsync} from '../../forecast/forecastSlice';
import ForecastWeatherDetails from '../../forecast/ForecastWeatherDetails';
import {getCities} from '../../../utils/localStorage';

const Details = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const {details, loading} = useAppSelector((state) => state.forecastWeather);

  useEffect(() => {
    const dataStorage = getCities('allCities');

    const filteredData = Object.values(dataStorage).filter((item: any) => {
      return item.id === Number(id);
    });

    filteredData.forEach((item: any) => {
      const [lat, lon] = item ? item.value.split(' ') : ['', ''];
      dispatch(
        forecastWeatherSliceAsync({
          lat,
          lon,
          searchId: item ? item.id : undefined,
        })
      );
    });
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <ForecastWeatherDetails data={details} />
      )}
    </>
  );
};

export default Details;
