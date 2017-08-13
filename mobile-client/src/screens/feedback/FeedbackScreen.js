import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Toolbar } from 'react-native-material-ui';

class FeedbackScreen extends Component {

    render() {
        return (
            <Toolbar
                centerElement="Feedback"
            />
        );
    }
}

const styles = StyleSheet.create({
    
});

export default FeedbackScreen;