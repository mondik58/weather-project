import {screen, waitFor} from '@testing-library/react';
import renderComponent from '../../../utils/tests/renderComponent';
import Home from './Home';
import {WeatherState} from '../../card/currentWeatherSlice';

describe('Home', () => {
  const initialState: WeatherState = {
    data: [
      {
        weather: [
          {
            id: 3,
            description: 'sun',
            icon: '01d',
          },
        ],
        main: {
          feels_like: 25,
          temp: 32,
          humidity: 10,
          pressure: 5,
        },
        wind: {
          speed: 15,
        },
        id: 1,
        name: 'London',
        searchId: 105,
        coord: {
          lat: '25.3994',
          lon: '55.4797',
        },
      },
    ],
    loading: false,
    error: null,
  };
  const render = () =>
    renderComponent(<Home />, {
      preloadedState: {
        currentWeather: initialState,
      },
    });

  describe('with data', () => {
    it('should render weather card', async () => {
      render();

      await waitFor(() => {
        expect(screen.getByText('London')).toBeInTheDocument();
      });
    });
  });
});

describe('with empty data', () => {
  const render = () => renderComponent(<Home />);
  it('should render correct text', async () => {
    render();

    await waitFor(() => {
      expect(screen.getByText('Select City')).toBeInTheDocument();
    });
  });
});
