import {screen, waitFor} from '@testing-library/react';
import renderComponent from '../../../utils/tests/renderComponent';
import userEvent from '@testing-library/user-event';
import {server} from '../../../utils/tests/server';
import Details from './Details';
import {setupStore} from '../../../app/store';
import {useAppDispatch} from '../../../app/hooks';
import {ForecastState} from '../../forecast/forecastSlice';

describe('Details', () => {
  const initialState: ForecastState = {
    details: {
      list: [
        {
          dt: 1660899600,
          weather: [
            {
              id: 3,
              description: 'sun',
              icon: '01d',
              main: 'test',
            },
          ],
          main: {
            feels_like: 25,
            temp: 32,
            humidity: 77,
            pressure: 5,
            temp_max: 35,
            temp_min: 33,
            sea_level: 1013,
            grnd_level: 1012,
          },
          wind: {
            speed: 15,
          },
          clouds: {
            all: 40,
          },
        },
      ],
      city: {
        id: 234,
        name: 'London',
      },
      cod: '200',
      message: 0,
      cnt: 40,
    },
    loading: false,
    error: null,
  };
  const render = () =>
    renderComponent(<Details />, {
      preloadedState: {
        forecastWeather: initialState,
      },
    });

  describe('with data', () => {
    it('should render weather card', async () => {
      render();

      await waitFor(() => {
        expect(
          screen.getByText('Variability of daily weather in London')
        ).toBeInTheDocument();
      });
    });
  });
  describe('when click accordion', () => {
    it('should open accordion', async () => {
      render();

      userEvent.click(screen.getByTestId('open-accordion'));

      await waitFor(() => {
        expect(screen.getByText(77)).toBeInTheDocument();
      });
    });
  });
});
