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

const MyTabNavigator = createMaterialBottomTabNavigator({
    Track: {
        screen: MyStackNavigator,
        navigationOptions: {
            tabBarLabel: {
                tintColor: 'blue'
            },
            tabBarIcon: ({ tintColor }) => (
                <MaterialIcons name = "view-list" color = { tintColor } size = { 25 }/>
            )
        }
    },
    Details: {
        screen: FundDetailsScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name = "md-analytics" color = { tintColor } size = { 25 }/>
            )
        }
    }
}, {
    backBehavior: 'initialRoute',
    shifting: true,
    animationEnabled: true,
    activeTintColor: 'white',
    
    tabBarOptions: {
    
        labelStyle: {
            fontSize: 14,
        },
        style: {
            borderTopWidth: 0.5,
            borderTopColor: '#6458A8'
        }
    }
});

export default MyTabNavigator;