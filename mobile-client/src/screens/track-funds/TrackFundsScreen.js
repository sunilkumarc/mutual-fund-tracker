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
    Image,
    DeviceEventEmitter,
    TouchableOpacity,
    TouchableHighlight,
    Alert,
    RefreshControl,
    ToastAndroid
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
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { FundsAPI } from '../../../constants/api';
import PopupMenu from '../../../helpers/PopupMenu';

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
            tableData: [],
            refreshing: false,
            lastRefreshed: null
        };
    }

    async loadData() {
        this.setState({ isLoading: true, tableData: [] });
        const storedFundsData = JSON.parse(await AsyncStorage.getItem('MF_DATA'));

        if (storedFundsData != null) {
            await AsyncStorage.setItem('DETAILS_PAGE_MF', JSON.stringify(storedFundsData[0]));
            this.setState({ tableData: storedFundsData });
        }
        let lastRefreshed = await AsyncStorage.getItem('LAST_UPDATED');
        if (lastRefreshed == null)
            this.setState({lastRefreshed: ''});
        else
            this.setState({lastRefreshed: lastRefreshed});
        this.setState({ isLoading: false });
    }

    async componentDidMount() {
        DeviceEventEmitter.addListener('FundAddedEvent', (e) => {
            this.loadData();
        });

        this.loadData();
        // await AsyncStorage.clear();
    }

    onPopupEvent = async (fund, index) => {
        if (index == 0) {
            await AsyncStorage.setItem('DETAILS_PAGE_MF', JSON.stringify(fund));
            DeviceEventEmitter.emit('DETAILS_FUND_UPDATED');
            this.props.navigation.navigate('Details');
        } else if (index == 1) {
            let storedFundsData = JSON.parse(await AsyncStorage.getItem('MF_DATA'));
            let newData = [];
            for (let i = 0; i < storedFundsData.length; ++i) {
                if (storedFundsData[i]["fundId"] != fund["fundId"]) {
                    newData.push(storedFundsData[i]);
                }
            }
            await AsyncStorage.removeItem('MF_DATA');
            if (newData.length == 0) {
                await AsyncStorage.removeItem('DETAILS_PAGE_MF');
            } else {
                await AsyncStorage.setItem('MF_DATA', JSON.stringify(newData));
                await AsyncStorage.setItem('DETAILS_PAGE_MF', JSON.stringify(newData[0]));
            }
            this.setState({ tableData: newData, isLoading: false });
        }
    }

    async _onRefresh() {
        this.setState({refreshing: true, isLoading: true});
        let storedFundsData = JSON.parse(await AsyncStorage.getItem('MF_DATA'));
        if (storedFundsData == null) {
            this.setState({refreshing: false, isLoading: false});
            return;
        }
        
        let res = [];
        for (i = 0; i < storedFundsData.length; ++i) {
            res.push(FundsAPI.getFundData(storedFundsData[i]["fundId"]));
        }
        newData = await Promise.all(res);
        await AsyncStorage.removeItem('MF_DATA');
        await AsyncStorage.setItem('MF_DATA', JSON.stringify(newData));
        let lastRefreshed = 'Last Updated On - ' + new Date().toDateString();
        await AsyncStorage.setItem('LAST_UPDATED', lastRefreshed);
        this.setState({refreshing: false, isLoading: false, lastRefreshed: lastRefreshed, tableData: newData});
    }

    async _deleteAll() {
        await Alert.alert(
            'Are you Sure?',
            'This will delete all the funds from your device!',
            [
                {text: 'Delete', onPress: () => this.deleteAll()},
                {text: 'Cancel', onPress: () => {}},                
            ]
        );
    }

    async deleteAll() {
        this.setState({refreshing: true});
        await AsyncStorage.removeItem('MF_DATA');
        this.setState({refreshing: false, tableData: []});
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Toolbar
                        rightElement="add-circle-outline"
                        centerElement={<Text style={styles.toolbarTitle}>Mutual Funds</Text>}
                        onRightElementPress={() => this.props.navigation.navigate('Manage')}
                    />
                    <ActivityIndicator
                        style={[styles.centering, { height: 500 }]}
                        size="large" />
                </View>
            );
        }
        let cards = this.state.tableData.map((fund) => {
            let imagePath = 'https://coin.zerodha.com/images/fund_houses/' + fund["amcCode"] + '.jpg';
            let fundPecentTag = fund["netPercentageChange"] > 0 
                                        ? <Text style={{color: 'green', fontWeight: 'bold', fontSize: 12}}><FontAwesome name='arrow-circle-up' size={15} color='green'/> {fund["netPercentageChange"]}%</Text> 
                                        : <Text style={{color: 'red', fontWeight: 'bold', fontSize: 12}}><FontAwesome name='arrow-circle-down' size={15} color='red'/> {fund["netPercentageChange"]}%</Text>;
            return <Card
                        style={{ container: styles.card }} key={fund["mutualFundName"]}>
                        <View style={styles.cardMain}>
                            <View style={styles.cardImage}>
                                <Image 
                                    style={{height: 60, margin: 2}}
                                    resizeMode='stretch'
                                    source={{uri: imagePath}}/>
                            </View>
                            <View style={styles.cardContent}>
                                <View style={styles.fundName}>
                                    <Text style={{ fontFamily: 'roboto', fontSize: 11, lineHeight: 22 }}>{fund["mutualFundName"]}</Text>
                                </View>
                                <View style={styles.fundDesc}>
                                    <View style={styles.fundNAV}>
                                        <Text style={{ fontSize: 12, fontFamily: 'lato' }}><FontAwesome name='rupee' size={11} /> {fund["NAV"]}</Text>
                                    </View>
                                    <View style={styles.fundPercent}>
                                        {fundPecentTag}
                                    </View>
                                </View>
                            </View>
                            <View style={styles.moreButton}>
                                <PopupMenu actions={['Details', 'Delete']} onPress={(event, index) => {
                                        this.onPopupEvent(fund, index);
                                    }}/>
                            </View>
                        </View>
                    </Card>;
        });

        var lastRefreshedText = <View style={styles.homeScreenImage}>
                                    <Image source={require('../../../assets/images/HomeScreen.png')} />
                                </View>
        if (this.state.tableData.length > 0) {
            lastRefreshedText = <View style={styles.lastRefreshedView}>
                <Text style={styles.lastRefreshedText}>
                    {this.state.lastRefreshed}
                </Text>
                <Button raised primary accent text="Delete All"
                    onPress={() => this._deleteAll()}
                    style={{
                        upperCase: false,
                        container: {
                            height: 20,
                            backgroundColor: '#FF6347',
                            marginLeft: 50
                        },
                        text: {
                            fontSize: 10,
                            fontFamily: 'lato'
                        }
                    }} />
            </View>;
        }

        return (
            <View style={styles.container}>
                <Toolbar
                    rightElement="add-circle-outline"
                    centerElement={<Text style={styles.toolbarTitle}>Mutual Funds</Text>}
                    onRightElementPress={() => this.props.navigation.navigate('Manage')}
                />
                <ScrollView 
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                    showsVerticalScrollIndicator={false}>
                    {lastRefreshedText}
                    {cards} 
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    toolbarTitle: {
        fontFamily: 'lato_bold',
        color: '#FFF',
        fontSize: 22
    },
    lastRefreshedView: {
        marginLeft: 15,
        marginTop: 12,
        flexDirection: 'row',
        height: 20,
    },
    lastRefreshedText: {
        fontFamily: 'lato_bold', 
        fontSize: 12,
        color: 'dimgray',
    },
    moreButton: {
        flex: 0.06,
        height: 130,
    },
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
        flex: 0.7,
        borderBottomColor: '#D3D3D3', 
        borderBottomWidth: 1,
        justifyContent: 'center',
        borderColor: '#000',
        padding: 10
    },
    fundDesc: {
        flex: 0.3,
        flexDirection: 'row',
        borderColor: '#000'
    },
    card: {
        height: 140,
        padding: 5,
        marginTop: 12,
        marginLeft: 15,
        marginRight: 15,
        alignSelf: 'stretch',
    },
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE'
    },
    homeScreenImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
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