---
sidebar_position: 1
---

# Getting Started with React Redux Toolkit

## Purpose

he Redux Toolkit package is intended to be the standard way to write React Redux logic. It was originally created to help address three common concerns about Redux:

- "Separating React Redux Logic is cumbersome"
- "I want to unit test React Redux and not only use react testing library"
- "React-Redux requires too much boilerplate code"

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
