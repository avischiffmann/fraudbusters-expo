import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import { FBImagePicker } from './containers/FBImagePicker';
import { Login } from './containers/Login';
// Settings screen for top level router
const SettingsStack = createStackNavigator({
  SignIn: {
    screen: Login,
    navigationOptions: {
      headerTitle: 'Sign In',
    },
  },
  CreateAccount: {
    screen: Login,
    navigationOptions: {
      headerTitle: 'Create Account',
    },
  },
  ForgotPassword: {
    screen: Login,
    navigationOptions: {
      headerTitle: 'Forgot Password',
    },
  },
  ResetPassword: {
    screen: Login,
    navigationOptions: {
      headerTitle: 'Reset Password',
    },
  },
});
// Camera screen for top level router
const AppTabs = createStackNavigator({
  Camera: {
    screen: FBImagePicker,
    navigationOptions: {
      headerTitle: 'Camera',
    },
  },
  Search: {
    screen: FBImagePicker,
    navigationOptions: {
      headerTitle: 'Search',
    },
  },
});
// Slide-out menu from left side
const MainDrawer = createDrawerNavigator({
  Camera: AppTabs,
  Settings: SettingsStack,
});
// Main router configuration
const AppModalStack = createStackNavigator(
  {
    Login: Login,
    App: MainDrawer,
  },
  {
    headerMode: 'none',
  },
);
// Router that shows only one route at a time and resets routes when switching screens
const TopLevelRouter = createSwitchNavigator({
  App: {
    screen: AppModalStack,
  },
  Settings: {
    screen: SettingsStack,
  },
  Loading: {
    screen: Login,
  },
});

const AppContainer = createAppContainer(TopLevelRouter);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
