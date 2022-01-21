import { Provider } from 'react-redux';

import { connectHooks, connectProps, store } from './store';

const ConnectedHooks = connectHooks('Connected Hooks Component', () => ({
  hooks: { hook1: 'hook1 value' },
}))(({ hooks }) => <h1>{hooks.hook1}</h1>);

const ConnectPropsChildren = connectProps(
  'ConnectPropsChildren',
  undefined,
  undefined,
  undefined,
)(() => <h1>Test</h1>);

export const ConnectedPropsComponent = connectProps(
  'React-Redux-Redux-Component',
  ({ state }) => state.example,
  ({ storeActions }) => ({
    onChangeInput1: storeActions.example.input1,
    onChangeInput2: storeActions.example.input2,
    setInput1: () =>
      storeActions.example.set({
        input1: 'set input1',
      }),
    setInput2: () =>
      storeActions.example.set({
        input2: 'set input2',
      }),
    resetAllInputs: () => storeActions.example.resetAll(),
    resetInput1: () => storeActions.example.reset(['input1']),
    resetInput2: () => storeActions.example.reset(['input2']),
    setAllInputs: () =>
      storeActions.example.setAll({
        input1: 'setAll input1',
        input2: 'setAll input2',
      }),
    setFromThunk: storeActions.thunks.example.setFromThunk,
  }),
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
      <Input placeholder="input1" value={state.input1} onChange={actions.onChangeInput1} />
    </div>
    <div>
      <Input placeholder="input2" onChange={actions.onChangeInput2} value={state.input2} />
    </div>
    <div>
      <Button onClick={actions.resetAllInputs}>Reset All input</Button>
      <Button onClick={actions.resetAllInputs}>Reset All input</Button>
      <Button onClick={actions.resetInput1}>Reset input 1</Button>
      <Button onClick={actions.resetInput2}>Reset input 2</Button>
      <Button onClick={actions.setInput1}>Set input 1</Button>
      <Button onClick={actions.setInput2}>Set input 2</Button>
      <Button onClick={actions.setAllInputs}>Set All input</Button>
      <Button onClick={actions.setFromThunk}>Set From Thunk</Button>
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
