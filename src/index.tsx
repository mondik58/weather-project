import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import {Provider} from 'react-redux';
import {setupStore} from './app/store';
import App from './App';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);
const store = setupStore;

root.render(
  <Provider store={store({})}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
