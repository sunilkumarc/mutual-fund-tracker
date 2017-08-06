import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ManageFundsScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>Manage Funds</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ManageFundsScreen;