import React, { Component } from 'react';
import {
    View,
    ScrollView,
    FlatList,
    Text,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
    Platform,
    Image
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
import { FontAwesome } from '@expo/vector-icons';

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
            const amcCode = data['data']['bse_master'][0]['amc_code'];

            const todayValue = data['data']['graph'][length - 1]['y'];
            const yesterdayValue = data['data']['graph'][length - 2]['y'];
            const netPercentageChange = ((todayValue - yesterdayValue) / todayValue * 100).toFixed(2);
            let tableData = this.state.tableData;
            tableData.push([mutualFundName, NAV, netPercentageChange, amcCode]);
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
            let imagePath = 'https://coin.zerodha.com/images/fund_houses/' + fund[3] + '.jpg';
            let fundPecentTag = fund[2] > 0 
                                        ? <Text style={{color: 'green', fontWeight: 'bold'}}><FontAwesome name='arrow-circle-up' size={15} color='green'/> {fund[2]}%</Text> 
                                        : <Text style={{color: 'red', fontWeight: 'bold'}}><FontAwesome name='arrow-circle-down' size={15} color='red'/> {fund[2]}%</Text>;
            console.log(imagePath);
            return <Card style={{ container: styles.card }} key={fund[0]}>
                <View style={styles.cardMain}>
                    <View style={styles.cardImage}>
                        <Image 
                            style={{height: 60, margin: 2}}
                            resizeMode='stretch'
                            source={{uri: imagePath}}/>
                    </View>
                    <View style={styles.cardContent}>
                        <View style={styles.fundName}>
                            <Text>{fund[0]}</Text>
                        </View>
                        <View style={styles.fundDesc}>
                            <View style={styles.fundNAV}>
                                <Text><FontAwesome name='rupee' size={13} /> {fund[1]}</Text>
                            </View>
                            <View style={styles.fundPercent}>
                                {fundPecentTag}
                            </View>
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
        alignItems: 'center',
        alignSelf: 'stretch',
        flexDirection: 'row',
    },
    cardImage: {
        flex: 0.4,
        height: 94, 
        justifyContent: 'center',
        borderRightColor: '#D3D3D3', 
        borderRightWidth: 1,
        paddingRight: 4
    },
    cardContent: {
        flex: 0.6, 
        marginLeft: 5
    },
    fundNAV: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        borderRightColor: '#D3D3D3', 
        borderRightWidth: 1,
    },
    fundPercent: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    fundName: {
        flex: 0.6,
        borderBottomColor: '#D3D3D3', 
        borderBottomWidth: 1,
        justifyContent: 'center',
        borderColor: '#000'
    },
    fundDesc: {
        flex: 0.4,
        flexDirection: 'row',
        borderColor: '#000'
    },
    card: {
        height: 100,
        padding: 5,
        marginTop: 5
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