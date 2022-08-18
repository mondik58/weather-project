import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import forecastWeatherReducer from '../features/forecast/forecastSlice';
import currentWeatherReducer from '../features/card/currentWeatherSlice';

export const store = configureStore({
  reducer: {
    forecastWeather: forecastWeatherReducer,
    currentWeather: currentWeatherReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
