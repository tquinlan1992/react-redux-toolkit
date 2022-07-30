import {
  connectHooks,
  connectHooksOwnProps,
  connectReact,
  connectReactFC,
  connectReactFCOwnProps,
  connectReactOwnProps,
  connectRedux,
  connectReduxWithOwnProps,
} from '../../connectProps';

import { createSelector } from '@reduxjs/toolkit';

export const ConnectedHooksComponent = connectHooks('Connected Hooks Component', ({ hooks }) => ({
  hooks: { hook1: hooks.hook1('testHookInput') },
}))(({ hooks, Components }) => {
  return (
    <Components.Button onClick={() => alert('ConnectedHooksComponent')}>
      {hooks.hook1}
    </Components.Button>
  );
});

export const ConnectedReactComponent = connectReact('ConnectReactComponent')(({ Components }) => (
  <Components.Button>Connect React Component</Components.Button>
));

export const ConnectedReactComponentOwnProps = connectReactOwnProps<{ label: string }>()(
  'ConnectedReactComponentOwnProps',
)(({ Components, label }) => <Components.Button>{label}</Components.Button>);

export const ConnectedReactFCComponent = connectReactFC('ConnectReactComponent')(
  ({ Components }) => <Components.Button>ConnectedReactFCComponent Component</Components.Button>,
);

export const ConnectedReactFCComponentOwnProps = connectReactFCOwnProps<{ label: string }>()(
  'ConnectedReactComponentOwnProps',
)(({ Components, label }) => <Components.Button>{label}</Components.Button>);

const NoParams = connectRedux('NoParams', undefined, undefined)(() => <h1>NoParams</h1>);

export default connectReduxWithOwnProps<{ test: string }>()(
  'Example',
  ({ state, selectors }) => ({
    input1: createSelector(selectors.example.input1, (input1) => input1)(state),
    input2: selectors.example.input2(state),
    hookInput: 'hookInput',
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
    hooks: { hook1 },
    form: {
      register,
      handleSubmit,
      formState: { errors },
    },
    Components: { Input, Button },
    actions,
  }) => {
    return (
      <>
        <h1>Example of GreenXBlack redux toolkit</h1>
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
            onChange={(event) => actions.example.input1(event.target.value)}
          />
        </div>
        <div>
          <Input
            placeholder="input2"
            onChange={(event) => actions.example.input2(event.target.value)}
            value={state.input2}
          />
        </div>
        <div>
          <Test123.Connected test1="Test Prop " />
          <Button onClick={actions.example.resetAll}>Reset All Input</Button>
          <Button onClick={() => actions.example.reset(['input1'])}>Reset Input 1</Button>
          <Button onClick={() => actions.example.reset(['input2'])}>Reset Input 2</Button>
          <Button onClick={() => actions.example.input1('input1 set')}>Set Input 1</Button>
          <Button onClick={() => actions.example.input2('input2 set')}>Set Input 1</Button>
          <Button
            onClick={() =>
              actions.example.setAll({ input1: 'input1 set all', input2: 'input2 setall' })
            }
          >
            Set All Input
          </Button>
          <Button onClick={actions.thunks.example.setFromThunk}>Set From Thunk</Button>
          <ConnectedHooksComponent.Connected />
        </div>
        <ConnectedReactComponent.Connected />
        <ConnectedReactComponentOwnProps.Connected label="ConnectedReactComponentOwnProps Label" />
      </>
    );
  },
);

export const Test123 = connectHooksOwnProps<{ test1: string }>()(
  'Test Prop',
  ({ ownProps: { test1 } }) => ({
    hooks: { test1: test1 + 'Test123' },
  }),
)(({ hooks }) => {
  return <div>{hooks.test1}</div>;
});
