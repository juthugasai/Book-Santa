import React, {Component} from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import CustomSideBarMenu from "./CustomSideBarMenu";
import AppTabNavigator from '../components/AppTabNavigator'


export const AppDrawerNavigator = createDrawerNavigator({
    Home : {screen: AppTabNavigator},
},
{
    contentComponent: CustomSideBarMenu
},
{
    initialRouteName: "Home"
})
