import Example from '../../components/Example';
import { Provider } from 'react-redux';
import { store } from '../../store';

const AppContainer = () => {
  return (
    <Provider store={store}>
      <Example.Connected test="test" />
    </Provider>
  );
};

export default AppContainer;
