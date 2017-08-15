import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Toolbar } from 'react-native-material-ui';

class FeedbackScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Toolbar
                    centerElement="Feedback"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE'
    }
});

export default FeedbackScreen;