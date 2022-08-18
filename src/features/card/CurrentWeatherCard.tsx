import {FC} from 'react';
import {Link} from 'react-router-dom';
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  CardMedia,
  Box,
  CardHeader,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {useAppDispatch} from '../../app/hooks';
import {
  removeCity,
  currentWeatherAsync,
  DataWeatherResponse,
} from './currentWeatherSlice';

const CurrentWeatherCard: FC<{data: DataWeatherResponse}> = ({data}) => {
  const dispatch = useAppDispatch();
  const {coord} = data;

  const onDelete = () => {
    const dataStorage = JSON.parse(localStorage.getItem('allCities') || '[]');
    const newArr = Object.values(dataStorage).filter(
      (element: any) => element.id !== data.searchId
    );

    localStorage.setItem('allCities', JSON.stringify(newArr));
    dispatch(removeCity(data.searchId));
  };

  const onUpdateWeather = () => {
    dispatch(
      currentWeatherAsync({
        lat: coord.lat,
        lon: coord.lon,
        searchId: data.searchId,
      })
    );
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        m: 2,
      }}
    >
      <Card
        variant='outlined'
        sx={{
          backgroundColor: '#333',
          maxWidth: 400,
          width: '100%',
        }}
      >
        <CardHeader
          action={
            <IconButton onClick={onDelete} color='secondary'>
              <CloseIcon fontSize='large' sx={{color: '#fff'}} />
            </IconButton>
          }
        />

        <CardContent>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Grid item xs={8}>
              <Typography sx={{fontSize: 25, mb: 0}} color='#fff' gutterBottom>
                {data.name}
              </Typography>
              <Typography sx={{fontSize: 16}} color='#fff' gutterBottom>
                {data.weather[0].description}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <CardMedia
                component='img'
                image={`icons/${data.weather[0].icon}.png`}
                alt={data.weather[0].icon}
                sx={{width: 100}}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent='center' alignItems='center'>
            <Grid item xs={6}>
              <Typography
                sx={{fontSize: 30, fontWeight: 700}}
                color='#fff'
                variant='body2'
              >
                {Math.round(data.main.temp)}°C
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Grid container justifyContent='center' alignItems='center'>
                  <Grid item></Grid>
                  <Grid item></Grid>
                </Grid>
              </Box>
              <Grid></Grid>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Button onClick={onUpdateWeather} variant='contained' size='small'>
              Update weather
            </Button>
            <Button
              variant='contained'
              component={Link}
              to={`/${data.searchId}`}
              size='small'
            >
              Details
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};

export default CurrentWeatherCard;
