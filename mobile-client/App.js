import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { TrackFundsScreen } from './src/screens';
import Root from './src/Root';

export default class App extends Component {
	render() {
		return (
			<Root />
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
