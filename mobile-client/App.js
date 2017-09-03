import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Root from './src/Root';
import { Toolbar, Card, COLOR, ThemeProvider } from 'react-native-material-ui';
import Exponent from 'expo';
import Expo from "expo";

const uiTheme = {
    palette: {
        primaryColor: '#6458A8',
    },
    toolbar: {
        container: {
			height: 50,
			marginTop: Exponent.Constants.statusBarHeight
        },
    },
};

export default class App extends Component {
	async componentDidMount() {
		await Expo.Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
			Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
		  });
	}
	render() {
		return (
			<ThemeProvider uiTheme={uiTheme}>
				<Root />
			</ThemeProvider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
