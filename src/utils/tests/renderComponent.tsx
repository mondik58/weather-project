import React, {PropsWithChildren} from 'react';

import {configureStore} from '@reduxjs/toolkit';
import type {PreloadedState} from '@reduxjs/toolkit';
import {render} from '@testing-library/react';
import type {RenderOptions} from '@testing-library/react';
import type {AppStore, RootState} from '../../app/store';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import currentWeatherSlice from '../../features/card/currentWeatherSlice';
import {setupStore} from '../../app/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

const renderComponent = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  function Wrapper({children}: PropsWithChildren<{}>): JSX.Element {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    );
  }

  return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})};
};

export default renderComponent;
