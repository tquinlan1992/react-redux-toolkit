import { ConnectedPropsComponent } from './react';
import { testComponent } from './testUtils';

testComponent('example-component', ConnectedPropsComponent, {
  mapState: ({ testMapState }) => {
    it('should mapStateToProps', () => {
      testMapState(
        {
          example: { input1: 'input1', input2: 'input2' },
        },
        { input1: 'input1', input2: 'input2' },
      );
    });
  },
  mapHooks: ({ mockHooks, testMapHooks, testHookCalled }) => {
    it('should map hooks', () => {
      const state = { input1: 'input1', input2: 'input2' };
      testMapHooks({
        given: { state, hooks: mockHooks },
        expect: {
          state,
          formDefaultValues: {
            username: 'initial username value',
          },
        },
        calledWith: () => ({
          hooks: {
            hook1: testHookCalled(mockHooks.hook1),
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
        },
        hooks: {
          hook1: 'hook1',
        },
      });
    });
  },
});
