import React from 'react';
import {
    DeviceEventEmitter
} from 'react-native';
import {
    createStackNavigator,
    createBottomTabNavigator,
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
    MaterialIcons,
    MaterialCommunityIcons
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
                <MaterialCommunityIcons name = "cards" color = { tintColor } size = { 20 }/>
                
            )
        }
    },
    Details: {
        screen: FundDetailsScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name = "md-analytics" color = { tintColor } size = { 20 }/>
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
        style: {
            backgroundColor: '#fff',
            borderTopWidth: 0.6,
            borderTopColor: '#6458A8',
        },
        labelStyle: {
            fontSize: 12,
        },
        tabStyle: {
            borderRightColor: '#6458A8'
        }
    },
});

export default MyTabNavigator;