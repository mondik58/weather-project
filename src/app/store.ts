import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  PreloadedState,
} from '@reduxjs/toolkit';
import forecastWeatherReducer from '../features/forecast/forecastSlice';
import currentWeatherReducer from '../features/card/currentWeatherSlice';

export const rootReducer = combineReducers({
  forecastWeather: forecastWeatherReducer,
  currentWeather: currentWeatherReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
