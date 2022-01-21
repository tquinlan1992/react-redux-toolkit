import Example from 'react-redux-toolkit-example/components/Example';
import { Provider } from 'react-redux';
import { store } from 'react-redux-toolkit-example/store';

const AppContainer = () => {
  return (
    <Provider store={store}>
      <Example.Connected />
    </Provider>
  );
};

export default AppContainer;
