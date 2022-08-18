import {Routes, Route} from 'react-router';
import Home from './features/pages/home';
import Details from './features/pages/details';
import {ROUTES} from './constants/routes';

import './styles/normalize.scss';

function App() {
  const {HOME, DETAILS} = ROUTES;
  return (
    <Routes>
      <Route path={HOME} element={<Home />} />
      <Route path={DETAILS} element={<Details />} />
      <Route path='*' element={<Home />} />
    </Routes>
  );
}

export default App;
