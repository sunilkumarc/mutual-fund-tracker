import axios from 'axios';

class API {
    async getFundData(fundId) {
        let url = `https://mf.zerodha.com/api/fund-info?graph_type=normal&scheme_id=${fundId}&session_token=`;
        console.log('GET - ', url);
        const { data } = await axios.get(url);
        const length = data['data']['graph'].length;
        const mutualFundName = data['data']['bse_master'][0]['scheme_name'];
        const NAV = data['data']['graph'][length - 1]['y'];
        const amcCode = data['data']['bse_master'][0]['amc_code'];
        const dateTime = data['data']['nav_prices'][0]['datetime'];

        const todayValue = data['data']['graph'][length - 1]['y'];
        const yesterdayValue = data['data']['graph'][length - 2]['y'];
        const netPercentageChange = ((todayValue - yesterdayValue) / todayValue * 100).toFixed(2);

        const manager = data['data']['master'][0]['manager'];
        const schemeClass = data['data']['master'][0]['scheme_class'];
        let minimumInvestment = parseFloat(data['data']['bse_master'][0]['min_purchase_amt']);
        minimumInvestment = Math.round(minimumInvestment * 100) / 100;
        const launchDate = data['data']['master'][0]['launch_date'];
        let exitLoad = data['data']['master'][0]['exit_load'];
        if (exitLoad != 'nil') {
            exitLoad += " %";
        }
        let dividentPayout = parseFloat(data['data']['master'][0]['dividend_percentage']);
        if (dividentPayout == "")
            dividentPayout = "N/A";
        else {
            dividentPayout = Math.round(dividentPayout * 100) / 100 + " %";
        }
        let oneYearReturns = data['data']['nav_prices'][0]['year_per'];
        oneYearReturns = Math.round(oneYearReturns * 100) / 100;
        
        let threeYearReturns = data['data']['nav_prices'][0]['three_year_comp_per'];
        threeYearReturns = Math.round(threeYearReturns * 100) / 100;

        let fiveYearReturns = data['data']['nav_prices'][0]['five_year_comp_per'];
        fiveYearReturns = Math.round(fiveYearReturns * 100) / 100;

        let apiGraphValues = data['data']['graph'];
        let graphValues = [apiGraphValues[length - 5], apiGraphValues[length-4], apiGraphValues[length-3], apiGraphValues[length-2], apiGraphValues[length-1]];
        let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
      
        let graphData = [];
        for (i = 0; i < graphValues.length; ++i) {
            let time = new Date(graphValues[i]['x']);
            graphData.push({x: monthNames[time.getMonth()] + ' ' + time.getDate(), y: graphValues[i]['y']});
        }
        let lastUpdated = new Date();
        return {
            "mutualFundName": mutualFundName,
            "NAV": NAV,
            "netPercentageChange": netPercentageChange,
            "amcCode": amcCode,
            "fundId": fundId,
            "dateTime": dateTime,
            "minimumInvestment": minimumInvestment,
            "schemeClass": schemeClass,
            "manager": manager,
            "launchDate": launchDate,
            "exitLoad": exitLoad,
            "dividentPayout": dividentPayout,
            "oneYearReturns": oneYearReturns,
            "threeYearReturns": threeYearReturns,
            "fiveYearReturns": fiveYearReturns,
            "graphData": graphData,
            "lastUpdated": lastUpdated.getFullYear() + "-" + lastUpdated.getMonth() + "-" + lastUpdated.getDate()
        }
    }
}

export const FundsAPI = new API();