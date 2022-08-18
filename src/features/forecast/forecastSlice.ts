import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {WEATHER_API_URL, WEATHER_API_KEY} from '../../constants/api';

interface ListData {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
  };
}

export interface ForecastWeatherData {
  cod: string;
  message: number | string;
  cnt: number;
  list: Array<ListData> | null;
  city: {
    id: number;
    name: string | null;
  };
}

export interface ForecastState {
  details: ForecastWeatherData | null;
  loading: boolean;
  error: any;
}

const initialState: ForecastState = {
  details: null,
  loading: false,
  error: null,
};

export const forecastWeatherSliceAsync = createAsyncThunk(
  'forecastWeather',
  async (prop: {lat: string; lon: string; searchId?: number}) => {
    const response = await fetch(
      `${WEATHER_API_URL}/forecast?lat=${prop.lat}&lon=${prop.lon}&appid=${WEATHER_API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    return response;
  }
);

export const forecastWeatherSlice = createSlice({
  name: 'forecastWeather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forecastWeatherSliceAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        forecastWeatherSliceAsync.fulfilled,
        (state, action: PayloadAction<ForecastWeatherData>) => {
          state.details = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        forecastWeatherSliceAsync.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload.error;
          state.loading = false;
        }
      );
  },
});

export const forecastWeather = (state: RootState) => state.forecastWeather;

export default forecastWeatherSlice.reducer;
