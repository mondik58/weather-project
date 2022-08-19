import {rest, setupWorker} from 'msw';
import * as responses from '../../constants/responses';
import {WEATHER_API_KEY, WEATHER_API_URL} from '../../constants/api';

export const requestHandlers = [
  rest.get(`${WEATHER_API_URL}/weather`, (req, res, ctx) => {
    return res(ctx.json(responses.getCurrentWeather));
  }),
];

// export const worker = setupWorker(
//   // Provide request handlers
//   rest.get(`${WEATHER_API_URL}/weather`, (req, res, ctx) => {
//     const { lat, lon, appid, units }= req.url.searchParams
//     return res(
//       ctx.json({
//         lat, lon, appid, units
//       }),
//     )
//   }),
// )
