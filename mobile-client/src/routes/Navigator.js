import React from 'react';
import {
    TabNavigator,
    DrawerNavigator,
    StackNavigator
} from 'react-navigation';
import {
    TrackFundsScreen,
    ManageFundsScreen,
    FeedbackScreen
} from '../screens';
import Exponent from 'expo';
import {
    FontAwesome,
    Octicons
} from '@expo/vector-icons';

const MyStackNavigator = StackNavigator({
    Track: {
        screen: TrackFundsScreen
    },
    Manage: {
        screen: ManageFundsScreen
    }
}, {
        headerMode: 'none'
    });

const MyTabNavigator = TabNavigator({
    Track: {
        screen: MyStackNavigator,
        navigationOptions: {
            title: 'Track Funds'
        }
    },
    Feedback: {
        screen: FeedbackScreen
    }
}, {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            upperCaseLabel: false,
            activeTintColor: '#7562DB',
            inactiveTintColor: '#7562DB',
            pressColor: '#7562DB',
            indicatorStyle: { backgroundColor: '#6458A8' },
            style: {
                backgroundColor: '#fff'
            }
        }
    });

export default MyTabNavigator;

// const TrackFundsScreenNavigator = StackNavigator({
//     Track: {
//         screen: TrackFundsScreen,
//         navigationOptions: () => ({
//             title: 'Track Funds',
//             headerTintColor: '#fff',
//             headerStyle: {
//                 marginTop: Exponent.Constants.statusBarHeight,
//                 backgroundColor: '#129490'
//             },
//             drawerIcon: ({ tintColor }) => (
//                 <FontAwesome
//                     name="money"
//                     size={20}
//                     color={tintColor}
//                 />
//             ),
//         }),
//     }
// });

// const ManageFundsScreenNavigator = StackNavigator({
//     Manage: {
//         screen: ManageFundsScreen,
//         navigationOptions: () => ({
//             title: 'Manage Funds',
//             headerTintColor: '#fff',
//             headerStyle: {
//                 marginTop: Exponent.Constants.statusBarHeight,
//                 backgroundColor: '#129490'
//             },
//             drawerIcon: ({ tintColor }) => (
//                 <Octicons
//                     name="settings"
//                     size={20}
//                     color={tintColor}
//                 />
//             ),
//         }),
//     }
// });

// const MyDrawerNavigator = DrawerNavigator({
//     Track: {
//         screen: TrackFundsScreenNavigator,
//     },
//     Manage: {
//         screen: ManageFundsScreenNavigator
//     }
// }, {
//         initialRouteName: 'Manage',
//         drawerWidth: 260,
//         contentOptions: {
//             activeTintColor: '#fff',
//             activeBackgroundColor: '#129490',
//             style: {
//                 marginTop: Exponent.Constants.statusBarHeight
//             }
//         }
//     });
