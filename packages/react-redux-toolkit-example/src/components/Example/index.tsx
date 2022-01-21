import { connectHooks, connectProps } from '../../store';

import { createSelector } from '@reduxjs/toolkit';

const ConnectedHooksComponent = connectHooks('Connected Hooks Component', () => ({
  hooks: { hook1: 'hook1 result' },
}))(({ hooks, Components }) => {
  return (
    <Components.Button onClick={() => alert('ConnectedHooksComponent')}>
      {hooks.hook1}
    </Components.Button>
  );
});

const NoParams = connectProps('NoParams', undefined, undefined, undefined)(() => <h1>NoParams</h1>);

export default connectProps(
  'Example',
  ({ state, selectors }) => ({
    input1: createSelector(selectors.example.input1, (input1) => input1)(state),
    input2: selectors.example.input2(state),
    hookInput: 'hookInput',
  }),
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
  ({ state, Yup, hooks }) => ({
    state,
    hooks: {
      hook1: hooks.hook1(state.hookInput),
    },
    form: {
      schema: Yup.object({
        username: Yup.string()
          .required('Username is required')
          .min(6, 'Username must be at least 6 characters')
          .max(20, 'Username must not exceed 20 characters'),
      }),
      defaultValues: {
        username: 'initial username',
      },
    },
  }),
)(
  ({
    state,
    actions,
    hooks: { hook1 },
    form: {
      register,
      handleSubmit,
      formState: { errors },
    },
    Components: { Input, Button },
  }) => {
    return (
      <>
        <h1>Example of redux toolkit</h1>
        <h1>Hooks results: {hook1}</h1>
        <p>username input error: {errors.username?.message}</p>
        <Input {...register('username')} placeholder="username" />
        <Button
          onClick={handleSubmit(
            (data) => console.log('valid', data),
            (data) => console.log('invalid', data),
          )}
        >
          Handle React Form Submit
        </Button>
        <NoParams.Connected />
        <Button onClick={() => alert('tom')}>Components.Button</Button>
        <div>
          <Input
            placeholder="input1"
            value={state.input1}
            onChange={(event) => actions.onChangeInput1(event.target.value)}
          />
        </div>
        <div>
          <Input
            placeholder="input2"
            onChange={(event) => actions.onChangeInput2(event.target.value)}
            value={state.input2}
          />
        </div>
        <div>
          <Button onClick={actions.resetAllInputs}>Reset All Input</Button>
          <Button onClick={actions.resetInput1}>Reset Input 1</Button>
          <Button onClick={actions.resetInput2}>Reset Input 2</Button>
          <Button onClick={actions.setInput1}>Set Input 1</Button>
          <Button onClick={actions.setInput2}>Set Input 2</Button>
          <Button onClick={actions.setAllInputs}>Set All Input</Button>
          <Button onClick={actions.setFromThunk}>Set From Thunk</Button>
          <ConnectedHooksComponent.Connected />
        </div>
      </>
    );
  },
);
