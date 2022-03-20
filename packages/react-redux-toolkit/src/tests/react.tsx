import { Provider } from 'react-redux';

import { connectHooks, connectRedux, store } from './store';

const ConnectedHooks = connectHooks('Connected Hooks Component', () => ({
  hooks: { hook1: 'hook1 value' },
}))(({ hooks }) => <h1>{hooks.hook1}</h1>);

const ConnectPropsChildren = connectRedux(
  'ConnectPropsChildren',
  undefined,
  undefined,
)(() => <h1>Test</h1>);

export const ConnectedPropsComponent = connectRedux(
  'React-Redux-Redux-Component',
  ({ state }) => state.example,
  ({ state, Yup, hooks: { hook1 } }) => {
    return {
      state,
      hooks: {
        hook1: hook1().result,
      },
      form: {
        schema: Yup.object({
          username: Yup.string()
            .required('Username is required')
            .min(6, 'Username must be at least 6 characters')
            .max(20, 'Username must not exceed 20 characters'),
        }),
        defaultValues: {
          username: 'initial username value',
        },
      },
    };
  },
)(({ state, actions, form, hooks: { hook1 }, Components: { Input, Button } }) => (
  <>
    <h1>Example of redux toolkit</h1>
    <h2>Hooks Result {hook1}</h2>
    <ConnectedHooks.Connected />
    <input {...form.register('username')} />
    <button onClick={() => form.handleSubmit((data) => console.log('formSubmit', data))} />
    <div>
      <Input placeholder="input1" value={state.input1} onChange={actions.example.input1} />
    </div>
    <div>
      <Input placeholder="input2" onChange={actions.example.input2} value={state.input2} />
    </div>
    <div>
      <Button onClick={actions.example.resetAll}>Reset All input</Button>
      <Button onClick={() => actions.example.reset(['input1'])}>Reset input 1</Button>
      <Button onClick={() => actions.example.reset(['input2'])}>Reset input 2</Button>
      <Button onClick={() => actions.example.input1('Set input 1')}>Set input 1</Button>
      <Button onClick={() => actions.example.input1('Set input 2')}>Set input 2</Button>
      <Button onClick={() => actions.example.setAll({ input1: 'set all 1', input2: 'set all 2' })}>
        Set All input
      </Button>
      <Button onClick={actions.thunks.example.setFromThunk}>Set From Thunk</Button>
      <ConnectPropsChildren.Connected />
    </div>
  </>
));

export const AppContainer = () => {
  return (
    <Provider store={store}>
      <ConnectedPropsComponent.Connected />
    </Provider>
  );
};
