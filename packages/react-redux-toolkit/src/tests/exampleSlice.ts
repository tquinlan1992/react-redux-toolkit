import { AppThunkAction, storeActions } from './store';
import { createSlice } from '..';

export interface State {
  input1: string;
  input2: string;
}

const initialState: State = {
  input1: '',
  input2: '',
};

export const example = createSlice({
  name: 'exampleSlice',
  initialState,
  reducers: {
    preFillInput1: (state) => {
      state.input1 = 'preFilledInput1';
    },
    preFillInput2: (state) => {
      state.input2 = 'preFilledInput2';
    },
    preFillInput1WithInput: (state, payload: string) => {
      state.input1 = payload;
    },
    preFillInput2WithInput: (state, payload: string) => {
      state.input2 = payload;
    },
  },
});

const setFromThunk = (): AppThunkAction => (dispatch) => {
  dispatch(storeActions.example.setAll({ input1: 'input1 thunk', input2: 'input2 thunk' }));
};

export const exampleThunks = {
  setFromThunk,
};
