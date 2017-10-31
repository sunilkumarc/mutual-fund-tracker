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
	fontFamily: 'lato',
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
			return (
				<View style={styles.container}>
					<Text style={styles.loadingText}>Loading ... </Text>
				</View>
			);
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
		backgroundColor: '#6458A8',
		alignItems: 'center',
		justifyContent: 'center',
	},
	loadingText: {
		fontSize: 24,
		color: '#fff',
	}
});
