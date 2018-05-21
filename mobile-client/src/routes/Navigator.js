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
import {
    FontAwesome,
    Octicons
} from '@expo/vector-icons';

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
    },
    Details: {
        screen: FundDetailsScreen,
    }
}, {
        tabBarPosition: 'bottom',
        // tabBarOptions: {
        //     upperCaseLabel: false,
        //     activeTintColor: '#7562CC',
        //     inactiveTintColor: '#7562DB',
        //     pressColor: '#7562DB',
        //     indicatorStyle: { backgroundColor: '#6458A8' },
        //     style: {
        //         backgroundColor: '#fff'
        //     },
        //     labelStyle: {
        //         fontSize: 13,
        //         fontWeight: 'bold'
        //     },
        // },
        // navigationOptions: ({ navigation, navigationOptions }) => ({
        //     tabBarOnPress: (scene, jumpToIndex) => {
        //         jumpToIndex(scene.index);
        //     },
        // }),
    });

export default MyTabNavigator;

