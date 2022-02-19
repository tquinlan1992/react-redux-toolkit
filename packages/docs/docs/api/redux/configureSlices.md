---
id: configureSlices
title: configureSlices
sidebar_label: configureSlices
hide_title: true
---

&nbsp;

# `configureSlices`

A way of creating master variables for `storeActions` and `storeSelectors` that take the shape of the `slices` object. Also will give back the root reducer to be used with `configureStore`

```ts
import { configureSlices } from '@tquinlan1992/react-redux-toolkit';
import { configureStore } from '@reduxjs/toolkit';

const {
  storeActions,
  storeSelectors,
  reducer
} = configureSlices(slices);

export const store = configureStore({
  reducer
});

```
