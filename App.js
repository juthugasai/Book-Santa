import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen.js';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from "react-navigation-tabs";
import {AppTabNavigator} from './components/AppTabNavigator'
import {AppDrawerNavigator} from "./components/AppDrawerNavigator"
export default function App() {
  return (
    <AppContainer/>
  );
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen: {screen: WelcomeScreen},
  Drawer:{screen:AppDrawerNavigator}
});

const AppContainer = createAppContainer(switchNavigator);