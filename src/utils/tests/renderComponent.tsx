import {render} from '@testing-library/react';
import {FC, ReactElement} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {store} from '../../app/store';

const renderComponent = (ui: ReactElement) => {
  const Wrapper: FC<any> = ({children}) => (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );

  return render(ui, {wrapper: Wrapper});
};

export default renderComponent;
