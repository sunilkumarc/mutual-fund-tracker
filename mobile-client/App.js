import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Root from './src/Root';
import { Toolbar, Card, COLOR, ThemeProvider } from 'react-native-material-ui';
import Exponent from 'expo';

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
