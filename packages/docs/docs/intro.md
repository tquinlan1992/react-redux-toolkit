---
sidebar_position: 1
---

# Getting Started with React Redux Toolkit

## Purpose

he Redux Toolkit package is intended to be the standard way to write React Redux logic. It was originally created to help address three common concerns about Redux:

"Separating React Redux Logic is cumbersome"
"I want to unit test React Redux and not only use react testing library"
"React-Redux requires too much boilerplate code"
We can't solve every use case, but in the spirit of create-react-app and apollo-boost, we can try to provide some tools that abstract over the setup process and handle the most common use cases, as well as include some useful utilities that will let the user simplify their application code.

React Redux Toolkit also includes new powerful ways to use React Redux. The mapHooksToProps allows easy separation of hook logic and presentational components. The optional extra args configuration for mapStateToProps, mapDispatchToProps, and mapHooksToProps allows for further opinion by the user.

These tools should be beneficial to all React Redux users. Whether you're a brand new React Redux user setting up your first project, or an experienced user who wants to simplify an existing application, React Redux Toolkit can help you make your React Redux code better.

## Installation

### Cloning Repo

Currently the way to get going is to clone the react-redux-toolkit repository and run the following within it

```bash
yarn install

yarn start
```

### Existing App

```bash
# NPM
npm install react-redux-toolkit
```

or

```bash
# Yarn
yarn add react-redux-toolkit
```

## What's Included

React Redux Toolkit includes these APIs:

- [`createSlice()`](./api/createSlice.mdx): wraps `createSlice` that gives back a default setter/getter slice based on the initialState properties
- [`createReducer()`](../api/createReducer.mdx): that lets you supply a lookup table of action types to case reducer functions, rather than writing switch statements. In addition, it automatically uses the [`immer` library](https://github.com/immerjs/immer) to let you write simpler immutable updates with normal mutative code, like `state.todos[3].completed = true`.
- [`createAction()`](../api/createAction.mdx): generates an action creator function for the given action type string. The function itself has `toString()` defined, so that it can be used in place of the type constant.
- [`createSlice()`](../api/createSlice.mdx): accepts an object of reducer functions, a slice name, and an initial state value, and automatically generates a slice reducer with corresponding action creators and action types.
- [`createAsyncThunk`](../api/createAsyncThunk.mdx): accepts an action type string and a function that returns a promise, and generates a thunk that dispatches `pending/fulfilled/rejected` action types based on that promise
- [`createEntityAdapter`](../api/createEntityAdapter.mdx): generates a set of reusable reducers and selectors to manage normalized data in the store
- The [`createSelector` utility](../api/createSelector.mdx) from the [Reselect](https://github.com/reduxjs/reselect) library, re-exported for ease of use.

```bash
cd my-website
npm run start
```

The `cd` command changes the directory you're working with. In order to work with your newly created Docusaurus site, you'll need to navigate the terminal there.

The `npm run start` command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

Open `docs/intro.md` (this page) and edit some lines: the site **reloads automatically** and displays your changes.
