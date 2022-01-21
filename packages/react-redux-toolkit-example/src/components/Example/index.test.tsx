import Example from '.';
import { testComponent } from '../../testUtils';

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
      });
    });
  },
});
