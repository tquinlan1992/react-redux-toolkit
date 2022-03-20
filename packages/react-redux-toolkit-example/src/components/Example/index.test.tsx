import Example, {
  ConnectedHooksComponent,
  ConnectedReactComponent,
  ConnectedReactComponentOwnProps,
  ConnectedReactFCComponent,
  ConnectedReactFCComponentOwnProps,
} from '.';
import { testComponent, testConnectHooks, testConnectReact } from '../../testUtils';

testComponent('Example', Example, {
  mapState: ({ testMapState }) => {
    it('should mapstate', () => {
      testMapState(
        {
          example: {
            input1: 'input1',
            input2: 'input2',
          },
        },
        {
          input1: 'input1',
          input2: 'input2',
          hookInput: 'hookInput',
        },
      );
    });
  },
  mapHooks: ({ testMapHooks, testHookCalled, mockHooks }) => {
    it('should map hooks', () => {
      const state = { hookInput: 'hookInput', input1: 'input1', input2: 'input2' };
      testMapHooks({
        given: {
          state: state,
          hooks: mockHooks,
          ownProps: { test: 'test' },
        },
        expect: {
          state,
          formDefaultValues: {
            username: 'initial username',
          },
        },
        calledWith: () => ({
          hooks: {
            hook1: testHookCalled(mockHooks.hook1, 'hookInput'),
          },
        }),
      });
    });
  },
  component: ({ testComponent }) => {
    it('props 1', () => {
      testComponent({
        state: {
          input1: 'input1',
          input2: 'input2',
          hookInput: 'hookInput',
        },
        hooks: {
          hook1: 'hook1',
        },
        test: 'test',
      });
    });
  },
});

testConnectHooks('ConnectedHooksComponent', ConnectedHooksComponent, {
  mapHooks: ({ testMapHooks, testHookCalled, mockHooks }) => {
    it('should map hooks', () => {
      testMapHooks({
        given: {
          ownProps: {},
          hooks: mockHooks,
        },
        calledWith: () => ({
          hooks: {
            hook1: testHookCalled(mockHooks.hook1, 'testHookInput'),
          },
        }),
      });
    });
  },
  component: ({ testComponent }) => {
    it('props 1', () => {
      testComponent({
        hooks: {
          hook1: 'hook1',
        },
      });
    });
  },
});

testConnectReact('ConnectedReactComponent', ConnectedReactComponent, {
  component: ({ testComponent }) => {
    it('props 1', () => {
      testComponent({});
    });
  },
});

testConnectReact('ConnectedReactComponentOwnProps', ConnectedReactComponentOwnProps, {
  component: ({ testComponent }) => {
    it('props 1', () => {
      testComponent({ label: 'ConnectedReactComponentOwnProps Label' });
    });
  },
});

testConnectReact('ConnectedReactFCComponent', ConnectedReactFCComponent, {
  component: ({ testComponent }) => {
    it('props 1', () => {
      testComponent({});
    });
  },
});

testConnectReact('ConnectedReactFCComponentOwnProps', ConnectedReactFCComponentOwnProps, {
  component: ({ testComponent }) => {
    it('props 1', () => {
      testComponent({ label: 'ConnectedReactFCComponentOwnProps Label' });
    });
  },
});
