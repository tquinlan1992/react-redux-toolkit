import { AppThunkAction } from '../connectProps';
import { createSlice } from '@tquinlan1992/react-redux-toolkit';
import { storeActions } from '../store';

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
    tom: (state) => {
      return state;
    },
  },
});

export const setFromThunk = (): AppThunkAction => (dispatch) => {
  dispatch(storeActions.example.setAll({ input1: 'input1 thunk', input2: 'input2 thunk' }));
};

export const thunkActions = {
  setFromThunk,
};
