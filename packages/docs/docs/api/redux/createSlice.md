---
id: createSlice
title: createSlice
sidebar_label: createSlice
hide_title: true
---

&nbsp;

# `createSlice`

### Redux Toolkit

https://redux-toolkit.js.org/api/createSlice

### React Redux Toolkit

Get getter/setter action/reducers based on the initial state properties.

In the following example there are 2 properties `firstName` and `lastName`. Putting this initial state through `createSlice` will create 2 actionCreators that are type safe based on the `Reducer State` interface

- `firstName`
- `lastName`

In addition to these action creators there also `set`, `setAll`, `reset`, `resestAll`

- `set` takes a subset of the `Reducer State` interface
- `setAll` takes a whole new state for the `Reducer State`
- `reset` takes an array of strings identifying which properties to reset to the initial state
- `resetAll` takes no arguments and resets the whole state to the initial state

```ts

import { AppThunkAction, storeActions } from '../store';

import { createSlice } from 'react-redux-toolkit';

export interface User {
  firstName: string;
  lastName: string;
}

const initialState: FormState = {
  firstName: '',
  lastName: '',
};

export const userSlice = createSlice({
  name: 'exampleSlice',
  initialState,
  reducers: {
  },
});

export const {
  firstName,
  lastName,
  set,
  setAll,
  reset,
  resetAll
  } = counterSlice.actions

export default counterSlice.reducer
```
