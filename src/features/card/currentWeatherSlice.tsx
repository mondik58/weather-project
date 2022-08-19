import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState, AppThunk} from '../../app/store';
import {WEATHER_API_URL, WEATHER_API_KEY} from '../../constants/api';

export interface DataWeatherResponse {
  weather: [
    {
      id: number;
      description: string;
      icon: string;
    }
  ];
  main: {
    feels_like: number;
    temp: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  } | null;
  id: number;
  name: string;
  searchId?: number;
  coord: {
    lat: string;
    lon: string;
  };
}

export interface WeatherState {
  data: Array<DataWeatherResponse>;
  loading: boolean;
  error: any;
}

const initialState: WeatherState = {
  data: [],
  loading: false,
  error: null,
};

export const currentWeatherAsync = createAsyncThunk(
  'currentWeather',
  async (prop: {lat: string; lon: string; searchId?: number}) => {
    const response = await fetch(
      `${WEATHER_API_URL}/weather?lat=${prop.lat}&lon=${prop.lon}&appid=${WEATHER_API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        return {...data, searchId: prop.searchId};
      });

    return response;
  }
);

export const currentWeatherSlice = createSlice({
  name: 'currentWeather',
  initialState,
  reducers: {
    removeCity(state, action) {
      state.data = state.data.filter(
        (city) => city.searchId !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(currentWeatherAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        currentWeatherAsync.fulfilled,
        (state, action: PayloadAction<DataWeatherResponse>) => {
          if (action.payload.searchId) {
            let foundIndex = state.data.findIndex((element) => {
              return element.searchId === action.payload.searchId;
            });
            if (foundIndex === -1) {
              state.data.push(action.payload);
            } else {
              state.data.splice(foundIndex, 1, {
                ...state.data[foundIndex],
                ...action.payload,
              });
            }
          }
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        currentWeatherAsync.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload.error;
          state.loading = false;
        }
      );
  },
});

export const selectWeather = (state: RootState) => state.currentWeather;
export const {removeCity} = currentWeatherSlice.actions;

export default currentWeatherSlice.reducer;
