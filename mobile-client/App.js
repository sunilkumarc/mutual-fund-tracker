import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Root from './src/Root';
import { Toolbar, Card, COLOR, ThemeProvider } from 'react-native-material-ui';
import Exponent from 'expo';
import Expo from "expo";
import { fontAssets } from './helpers';

const uiTheme = {
    palette: {
        primaryColor: '#6458A8',
	},
	fontFamily: 'roboto_italic',
    toolbar: {
        container: {
			height: 50,
			marginTop: Exponent.Constants.statusBarHeight
        },
    },
};

export default class App extends Component {
	state = {
		fontLoaded: false,
	}

	async componentDidMount() {
		this._loadAssetsAsync();
	}

	async _loadAssetsAsync() {
		await Promise.all(fontAssets);
		this.setState({ fontLoaded: true });
	}

	render() {
		if (!this.state.fontLoaded) {
			return <ActivityIndicator
				style={[styles.centering, { height: 500 }]}
				size="large" />
		}

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
