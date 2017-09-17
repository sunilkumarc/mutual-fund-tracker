import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    AsyncStorage, 
    DeviceEventEmitter,
    ScrollView,
    Image
} from 'react-native';
import { 
    Toolbar, 
    Card 
} from 'react-native-material-ui';
import { FontAwesome } from '@expo/vector-icons';

class FundDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            fundData: {}
        };
    }

    async loadData() {
        let fundToShow = JSON.parse(await AsyncStorage.getItem('DETAILS_PAGE_MF'));
        this.setState({ fundData: fundToShow });
        console.log(fundToShow);
    }
    
    async componentDidMount() {
        DeviceEventEmitter.addListener('DETAILS_FUND_UPDATED', (e) => {
            this.loadData();
        });

        this.loadData();
    }

    render() {
        let fund = this.state.fundData;
        let imagePath = 'https://coin.zerodha.com/images/fund_houses/' + fund[3] + '.jpg';
        let fundPecentTag = fund[2] > 0 
            ?   <Text style={{color: 'green', fontFamily: 'lato_bold', fontSize: 12, lineHeight: 25}}>
                    <FontAwesome name='rupee' size={13} /> {fund[1]}  ( <FontAwesome name='arrow-circle-up' size={15} color='green'/> {fund[2]}% )
                    <Text style={{ color: 'grey' }}>   as on {fund[5]}</Text>
                </Text> 
            :   <Text style={{color: 'red', fontFamily: 'lato_bold', fontSize: 12, lineHeight: 25}}>
                    <FontAwesome name='rupee' size={13} /> {fund[1]}  ( <FontAwesome name='arrow-circle-down' size={15} color='red'/> {fund[2]}% )
                    <Text style={{ color: 'grey' }}>   as on {fund[5]}</Text>
                </Text>;
        return (
            <View style={styles.container}>
                <Toolbar centerElement="Fund Details"/>
                <ScrollView>
                    <Card style={{ container: styles.detailsCard }}>
                        <View style={styles.detailsContainer}>
                            <View style={styles.imageContainer}>
                                <Image 
                                    style={styles.fundImage}
                                    resizeMode='stretch'
                                    source={{uri: imagePath}}/>
                            </View>
                            <View style={styles.fundName}>
                                <Text style={{ fontFamily: 'lato_bold', fontSize: 15, lineHeight: 25, paddingLeft: 20, paddingRight: 20, textAlign: 'center' }}>{fund[0]}</Text>
                            </View>
                            <View>
                                {fundPecentTag}
                            </View>
                        </View>

                        <View style={styles.otherDetails}>
                            <View style={styles.otherDetailsRow}>
                                <View style={{ flex:0.5 }}><Text>Min Investment</Text></View>
                                <View style={{ flex:0.5 }}><Text>Scheme Class</Text></View>
                            </View>
                        </View>
                    </Card>
                    <Card style={{ container: styles.card }} />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEE'
    },
    detailsCard: {
        flex: 1,
        height: 400,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
    },
    fundName: {
        marginBottom: 5,
    },
    fundImage: {
        height: 100,
        width: 250,
        margin: 2
    },
    imageContainer: {
        paddingTop: 30,
        paddingBottom: 25
    },
    detailsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    otherDetails: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 30
    },
    otherDetailsRow: {
        backgroundColor: 'grey',
        flexDirection: 'row',
        
        // alignItems: 'center',
        // justifyContent: 'center'
    }
});

export default FundDetailsScreen;