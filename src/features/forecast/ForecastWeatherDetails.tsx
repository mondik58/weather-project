import {FC, useState} from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Box} from '@mui/system';
import './index.scss';
import {ForecastWeatherData} from './forecastSlice';

const WEEK_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const ForecastWeatherDetails: FC<{data: ForecastWeatherData | null}> = ({
  data,
}) => {
  const dayInAWeek = new Date().getDay();
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );
  const list = data?.list ? [...data.list] : null;
  const name = data?.city?.name ? data.city.name : null;

  return (
    <Box
      component='div'
      sx={{
        width: '100%',
        height: '100%',
        maxWidth: 650,
        margin: '0 auto',
        position: 'relative',
        top: '50%',
        transform: 'translate(0, 50%)',
      }}
    >
      <Typography
        sx={{fontSize: 25, fontWeight: 700, textAlign: 'center', mt: 2}}
      >
        Variability of daily weather in {name}
      </Typography>
      {list &&
        list.splice(0, 7).map((item: any, idx: number) => (
          <Accordion
            onChange={handleChange(`panel${idx}`)}
            key={idx}
            expanded={expanded === `panel${idx}`}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
              sx={{alignItems: 'center'}}
            >
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Box
                  sx={{width: 40}}
                  component='img'
                  src={`icons/${item.weather[0].icon}.png`}
                />
                <Typography sx={{ml: 2, display: 'inline-block'}}>
                  {forecastDays[idx]}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{mr: 2, fontSize: 12, display: 'inline-block'}}>
                  {item.weather[0].description}
                </Typography>
                <Typography sx={{fontSize: 12, display: 'inline-block'}}>
                  {Math.round(item.main.temp_max)}°C /
                  {Math.round(item.main.temp_min)}°C
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography sx={{fontSize: 12}}>Pressure:</Typography>
                    <Typography sx={{fontSize: 12}}>
                      {item.main.pressure}
                    </Typography>
                  </Box>

                  <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography sx={{fontSize: 12}}>Clouds:</Typography>
                    <Typography sx={{fontSize: 12}}>
                      {item.clouds.all}%
                    </Typography>
                  </Box>
                  <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography sx={{fontSize: 12}}>Sea level:</Typography>
                    <Typography sx={{fontSize: 12}}>
                      {item.main.sea_level}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography sx={{fontSize: 12}}>Humidity:</Typography>
                    <Typography sx={{fontSize: 12}}>
                      {item.main.humidity}
                    </Typography>
                  </Box>
                  <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography sx={{fontSize: 12}}>Wind speed:</Typography>
                    <Typography sx={{fontSize: 12}}>
                      {item.wind.speed}
                    </Typography>
                  </Box>
                  <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography sx={{fontSize: 12}}>Feels like:</Typography>
                    <Typography sx={{fontSize: 12}}>
                      {item.main.feels_like}°C
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  );
};

export default ForecastWeatherDetails;
