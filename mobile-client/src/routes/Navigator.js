import React from 'react';
import {
    DeviceEventEmitter
} from 'react-native';
import {
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation';
import {
    TrackFundsScreen,
    ManageFundsScreen,
    FundDetailsScreen
} from '../screens';
import Exponent from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    FontAwesome,
    Ionicons,
    MaterialIcons
} from '@expo/vector-icons';


import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

const MyStackNavigator = createStackNavigator({
    Track: {
        screen: TrackFundsScreen
    },
    Manage: {
        screen: ManageFundsScreen
    }
}, {
        headerMode: 'none'
});
    
const MyTabNavigator = createBottomTabNavigator({
    Track: {
        screen: MyStackNavigator,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <MaterialIcons name = "view-list" color = { tintColor } size = { 22 }/>
            )
        }
    },
    Details: {
        screen: FundDetailsScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name = "md-analytics" color = { tintColor } size = { 22 }/>
            )
        }
    }
}, {
    backBehavior: 'initialRoute',
    swipeEnabled: true,
    tabBarOptions: {
        upperCaseLabel: false,
        activeTintColor: '#7562DB',
        pressColor: '#7562DB',
        pressOpacity: 1,    
        indicatorStyle: { backgroundColor: '#6458A8' },
        style: {
            backgroundColor: '#fff'
        },
        labelStyle: {
            fontSize: 13,
            fontWeight: 'bold'
        },
        tabStyle: {
            borderRightWidth: 0.5,
            borderRightColor: '#6458A8'
        }
    },
});

export default MyTabNavigator;