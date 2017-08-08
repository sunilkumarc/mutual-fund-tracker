import React from 'react';
import {
    TabNavigator,
    DrawerNavigator,
    StackNavigator
} from 'react-navigation';
import {
    TrackFundsScreen,
    ManageFundsScreen
} from '../screens';
import Exponent from 'expo';
import { 
    FontAwesome, 
    Octicons 
} from '@expo/vector-icons';

const TrackFundsScreenNavigator = StackNavigator({
    Track: {
        screen: TrackFundsScreen,
        navigationOptions: () => ({
            title: 'Track Funds',
            headerTintColor: '#fff',
            headerStyle: {
                marginTop: Exponent.Constants.statusBarHeight,
                backgroundColor: '#129490'
            },
            drawerIcon: ({ tintColor }) => (
                <FontAwesome
                    name="money"
                    size={20}
                    color={tintColor}
                />
            ),
        }),
    }
});

const ManageFundsScreenNavigator = StackNavigator({
    Manage: {
        screen: ManageFundsScreen,
        navigationOptions: () => ({
            title: 'Manage Funds',
            headerTintColor: '#fff',
            headerStyle: {
                marginTop: Exponent.Constants.statusBarHeight,
                backgroundColor: '#129490'
            },
            drawerIcon: ({ tintColor }) => (
                <Octicons
                    name="settings"
                    size={20}
                    color={tintColor}
                />
            ),
        }),
    }
});

const MyDrawerNavigator = DrawerNavigator({
    Track: {
        screen: TrackFundsScreenNavigator,
    },
    Manage: {
        screen: ManageFundsScreenNavigator
    }
}, {
        initialRouteName: 'Track',
        drawerWidth: 260,
        contentOptions: {
            activeTintColor: '#fff',
            activeBackgroundColor: '#129490',
            style: {
                marginTop: Exponent.Constants.statusBarHeight
            }
        }
    });

export default MyDrawerNavigator;