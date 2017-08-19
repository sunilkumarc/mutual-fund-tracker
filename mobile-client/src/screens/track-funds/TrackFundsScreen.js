import React, { Component } from 'react';
import {
    View,
    ScrollView,
    FlatList,
    Text,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
    Platform
} from 'react-native';
import {
    Table,
    TableWraper,
    Row,
    Rows,
    Col,
    Cols,
    Cell
} from 'react-native-table-component';
import {
    getTheme,
} from 'react-native-material-kit';
import axios from 'axios';
import styled from 'styled-components/native';
import { Toolbar, COLOR, ThemeProvider, Card, Button, ActionButton } from 'react-native-material-ui';
// import { Card, Button, Image } from 'react-native-material-design';

const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};

const theme = getTheme();

class TrackFundsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            tableHead: ['Mutual Fund', 'NAV', '% Change'],
            tableData: []
        };
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        await AsyncStorage.setItem('mf_ids', JSON.stringify(['14058215.00206600', '14058353.00206600', '14058358.00206600', '14057817.00206600', '14058432.00206600']));
        const storedMFIds = JSON.parse(await AsyncStorage.getItem('mf_ids'));

        for (let i = 0; i < storedMFIds.length; ++i) {

            const fundId = storedMFIds[i];
            const url = "https://mf.zerodha.com/api/fund-info?graph_type=normal&scheme_id=" + fundId + "&session_token=";
            const { data } = await axios.get(url);
            const length = data['data']['graph'].length;
            const mutualFundName = data['data']['bse_master'][0]['scheme_name'];
            const NAV = data['data']['graph'][length - 1]['y'];

            const todayValue = data['data']['graph'][length - 1]['y'];
            const yesterdayValue = data['data']['graph'][length - 2]['y'];
            const netPercentageChange = ((todayValue - yesterdayValue) / todayValue * 100).toFixed(2);
            let tableData = this.state.tableData;
            tableData.push([mutualFundName, NAV, netPercentageChange]);
            this.setState({ tableData: tableData });
        }

        this.setState({ isLoading: false });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Toolbar
                        rightElement="add"
                        centerElement="Your Mutual Funds"
                        onRightElementPress={() => this.props.navigation.navigate('Manage')}
                    />
                    <ActivityIndicator
                        style={[styles.centering, { height: 500 }]}
                        size="large" />
                </View>
            );
        }
        let cards = this.state.tableData.map((fund) => {
            return <Card style={{ container: styles.card }} key={fund[0]}>
                <View style={styles.cardMain}>
                    <View style={styles.fundName}>
                        <Text>{fund[0]}</Text>
                    </View>
                    <View style={styles.fundDesc}>
                        <View style={styles.fundNAV}>
                            <Text>{fund[1]}</Text>
                        </View>
                        <View style={styles.fundPercent}>
                            <Text>{fund[2]}</Text>
                        </View>
                    </View>
                </View>
            </Card>;
        });
        return (
            <View style={styles.container}>
                <Toolbar
                    rightElement="add"
                    centerElement="Your Mutual Funds"
                    onRightElementPress={() => this.props.navigation.navigate('Manage')}
                />
                <ScrollView 
                    showsVerticalScrollIndicator={false}>
                    <View>
                        {cards}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardMain: {
        flex: 1,
    },
    fundNAV: {
        flex: 0.5,
        justifyContent: 'center',
    },
    fundPercent: {
        flex: 0.5,
        justifyContent: 'center',
    },
    fundName: {
        flex: 0.6,
        justifyContent: 'center',
        borderColor: '#000',
        backgroundColor: '#8679CF'
    },
    fundDesc: {
        flex: 0.4,
        flexDirection: 'row',
        borderColor: '#000',
        backgroundColor: '#7562DB'
    },
    card: {
        height: 120,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE'
    },
    fundsTable: {
        marginTop: 5
    },
    head: {
        height: 40,
        backgroundColor: '#454545',
    },
    headText: {
        marginLeft: 5,
        color: '#fff',
        textAlign: 'center'
    },
    dataText: {
        marginTop: 5,
        marginBottom: 5,
        textAlign: 'center'
    },
    row: {
        backgroundColor: '#fff'
    }
});

const FlexContainer = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
    alignSelf: stretch;
`;

export default TrackFundsScreen;