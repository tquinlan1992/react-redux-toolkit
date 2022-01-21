import { store, storeActions, storeSelectors } from './store';

describe('exampleSlice', () => {
  describe('actions', () => {
    it('should update input1', () => {
      store.dispatch(storeActions.example.input1('input1 updated'));
      expect(store.getState()).toMatchObject({ example: { input1: 'input1 updated', input2: '' } });
    });
    it('should update input2', () => {
      store.dispatch(storeActions.example.input2('input2 updated'));
      expect(store.getState()).toMatchObject({
        example: { input1: 'input1 updated', input2: 'input2 updated' },
      });
    });
    it('should update all state', () => {
      store.dispatch(
        storeActions.example.setAll({
          input1: 'input1 updated from setAll',
          input2: 'input2 updated from setAll',
        }),
      );
      expect(store.getState()).toMatchObject({
        example: {
          input1: 'input1 updated from setAll',
          input2: 'input2 updated from setAll',
        },
      });
    });
    it('should reset input1', () => {
      store.dispatch(storeActions.example.reset(['input1']));
      expect(store.getState()).toMatchObject({
        example: {
          input1: '',
          input2: 'input2 updated from setAll',
        },
      });
    });
    it('should reset input2', () => {
      store.dispatch(storeActions.example.reset(['input2']));
      expect(store.getState()).toMatchObject({
        example: {
          input1: '',
          input2: '',
        },
      });
    });
    it('should set input1', () => {
      store.dispatch(storeActions.example.set({ input1: 'input1 updated from set' }));
      expect(store.getState()).toMatchObject({
        example: { input1: 'input1 updated from set', input2: '' },
      });
    });
    it('should set input2', () => {
      store.dispatch(storeActions.example.set({ input2: 'input2 updated from set' }));
      expect(store.getState()).toMatchObject({
        example: { input1: 'input1 updated from set', input2: 'input2 updated from set' },
      });
    });
    it('should reset all', () => {
      store.dispatch(storeActions.example.resetAll());
      expect(store.getState()).toMatchObject({
        example: {
          input1: '',
          input2: '',
        },
      });
    });
    it('prefill input 1 with preFillInput1', () => {
      store.dispatch(storeActions.example.preFillInput1());
      expect(store.getState()).toMatchObject({
        example: {
          input1: 'preFilledInput1',
          input2: '',
        },
      });
    });
    it('prefill input 2 with preFillInput2', () => {
      store.dispatch(storeActions.example.preFillInput2());
      expect(store.getState()).toMatchObject({
        example: {
          input1: 'preFilledInput1',
          input2: 'preFilledInput2',
        },
      });
    });
    it('prefill input 1 with preFillInput1WithInput', () => {
      store.dispatch(
        storeActions.example.preFillInput1WithInput('input1 with preFillInput1WithInput'),
      );
      expect(store.getState()).toMatchObject({
        example: {
          input1: 'input1 with preFillInput1WithInput',
          input2: 'preFilledInput2',
        },
      });
    });
    it('prefill input 2 with preFillInput2WithInput', () => {
      store.dispatch(
        storeActions.example.preFillInput2WithInput('input2 with preFillInput2WithInput'),
      );
      expect(store.getState()).toMatchObject({
        example: {
          input1: 'input1 with preFillInput1WithInput',
          input2: 'input2 with preFillInput2WithInput',
        },
      });
    });
    it('should set from a thunk', () => {
      store.dispatch(storeActions.thunks.example.setFromThunk());
      expect(store.getState()).toMatchObject({
        example: { input1: 'input1 thunk', input2: 'input2 thunk' },
      });
    });
  });
  describe('selectors', () => {
    it('should select input1', () => {
      expect(storeSelectors.example.input1(store.getState())).toEqual('input1 thunk');
    });
    it('should select input2', () => {
      expect(storeSelectors.example.input2(store.getState())).toEqual('input2 thunk');
    });
  });
});
