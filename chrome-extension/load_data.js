function round(num) {
    return Math.round(num * 100) / 100;
}

$(document).on('click', function (ev) {
    $("#fund-options").css("display", "none");
});

$("#fund-options").click(function (ev) {
    $("#fund-options").css("display", "none");
    $("#fund").val(ev.target.innerHTML.split("<br>")[0]);
    window.localStorage.setItem("mf_fund_id", ev.target.id);
    $("#fund-options").html("");
});

$("#go-back").click(function (ev) {
    $("#details-page").slideUp();
    $("#home-page").slideDown();
});

$('body').on('click', 'a', function () {
    if ($(this).attr("id") != "clear")
        chrome.tabs.create({ url: $(this).attr('href') });
});

$(document).on('click','.go-back',function(){
    $("#details-page").slideUp();
    $("#home-page").slideDown();
});

function prepareDetailsPage(data) {
    console.log(JSON.stringify(data));
    var length = data['data']['graph'].length;
    var content = "";

    content += "<i class='em em-x close-details-page go-back'></i>";
    content += "<div class='details-page-image'>";
    content += "<img src=\"https://coin.zerodha.com/images/fund_houses/" + data['data']['bse_master'][0]['amc_code'] + ".jpg\" />";
    content += "<div class='details-page-text'>" + data['data']['bse_master'][0]['scheme_name'] + "</div>";

    var todayValue = data['data']['graph'][length - 1]['y'];
    var yesterdayValue = data['data']['graph'][length - 2]['y'];
    var netPercentageChange = (todayValue - yesterdayValue) / todayValue * 100;
    var dateTime = data['data']['nav_prices'][0]['datetime'];
    var oneYearReturns = data['data']['nav_prices'][0]['year_per'];
    oneYearReturns = Math.round(oneYearReturns * 100) / 100;
    
    var threeYearReturns = data['data']['nav_prices'][0]['three_year_comp_per'];
    threeYearReturns = Math.round(threeYearReturns * 100) / 100;

    var fiveYearReturns = data['data']['nav_prices'][0]['five_year_comp_per'];
    fiveYearReturns = Math.round(fiveYearReturns * 100) / 100;

    if (netPercentageChange < 0) {
        content += "<div class='negative-nav details-page-text'>";
    } else if (netPercentageChange > 0) {
        content += "<div class='positive-nav details-page-text'>";
    } else {
        content += "<div>";
    }
    content += "<span>" + todayValue + "</span>";
    content += "<span>( " + round(netPercentageChange) + "% )</span>";
    content += "<span> as on " + dateTime + "</span>";
    content += "</div>";

    content += "<hr/>";
    content += "<table class='returns-table'>";
    content += "<tr><td>1 Year</td><td>" + oneYearReturns + "%</td></tr>";
    content += "<tr><td>3 Year</td><td>" + threeYearReturns + "%</td></tr>";
    content += "<tr><td>5 Year</td><td>" + fiveYearReturns + "%</td></tr>";
    content += "</table>";

    var minInvestment = data['data']['bse_master'][0]['min_purchase_amt'];
    minInvestment = Math.round(minInvestment * 100) / 100;
    var schemeClass = data['data']['master'][0]['scheme_class'];
    var manager = data['data']['master'][0]['manager'];
    var launchDate = data['data']['master'][0]['launch_date'];
    var exitLoad = data['data']['master'][0]['exit_load'];
    if (exitLoad != 'nil') {
        exitLoad += " %";
    }
    var dividentPayout = parseFloat(data['data']['master'][0]['dividend_percentage']);
    if (dividentPayout == "")
        dividentPayout = "N/A";
    else {
        dividentPayout = Math.round(dividentPayout * 100) / 100 + " %";
    }

    content += "<hr/>";
    content += "<table class='additional-details-table'>";
    content += "<tr><td>Min Investment</td><td>Scheme Class</td></tr>";
    content += "<tr><td>" + minInvestment + "</td><td>" + schemeClass + "</td></tr>";
    content += "<tr><td></td><td></td></tr>";

    content += "<tr><td>Manager Name</td><td>Launch Date</td></tr>";
    content += "<tr><td>" + manager + "</td><td>" + launchDate + "</td></tr>";
    content += "<tr><td></td><td></td></tr>";

    content += "<tr><td>Exit Load</td><td>Dividend Payout</td></tr>";
    content += "<tr><td>" + exitLoad + "</td><td>" + dividentPayout + "</td></tr>";
    content += "</table>";

    content += "</div>";
    return content;
}

$(document).on('click','.go-to-details',function(){
    var fund_id = $(this).attr("href");
    var url = "https://mf.zerodha.com/api/fund-info?graph_type=normal&scheme_id=" + fund_id + "&session_token=";
    $.ajax({
        url: url,
        async: false,
        success: function(data) {
            $("#details-page").html(prepareDetailsPage(data));
        
            $("#home-page").slideUp();
            $("#details-page").slideDown();
        },
        error: function(error) {
            console.log('HERE' + error);
        } 
    });
});

$("#add-mutual-fund").click(function () {
    var mfId = window.localStorage.getItem("mf_fund_id");
    $("#funds-table").css("display", "table");
    chrome.storage.sync.get("mf_ids", function (data) {
        if (data == undefined || $.isEmptyObject(data)) {
            data = {};
            data.mf_ids = [];
        }
        data.mf_ids.push(mfId);
        chrome.storage.sync.set({ "mf_ids": data.mf_ids }, function () { });
        getData(mfId);
        window.localStorage.removeItem("mf_fund_id");
        $("#fund").val("");
    });
});

$("#check").click(function () {
    chrome.storage.sync.get("mf_ids", function (data) {
        if (data.mf_ids != undefined) {
            alert(JSON.stringify(data.mf_ids));
        } else {
            alert("Nothing stored yet!");
        }
    });
});

$("#clear").click(function () {
    var answer = confirm('Are you sure?');
    if (answer) {
        chrome.storage.sync.clear();
        $("#funds-data").html("");
        $("#funds-table").css("display", "none");
    }
});

$("#fund").keyup(function () {
    var str = $("#fund").val();
    str = new RegExp(str, "i");

    var matches = autoCompleteData.filter(function (mf) {
        var res = mf["name"].match(str);
        return res;
    });

    var content = "";
    for (var i = 0; i < matches.length; ++i) {
        content += "<div id=\"" + matches[i].code + "\" style=\"border-bottom: 1px solid; cursor: pointer\">" + matches[i].name + "<br/>(" + matches[i].desc + ")" + "</div>";
    }

    $("#fund-options").html(content);
    $("#fund-options").css("display", "block");
});

$("#funds-table").on("click", ".remove-fund", function (ev) {
    var answer = confirm('Are you sure?');
    if (answer) {
        chrome.storage.sync.get("mf_ids", function (data) {
            if (data != undefined && !$.isEmptyObject(data)) {
                var index = data.mf_ids.indexOf($(ev.target).attr("data-value"));
                if (index >= 0) {
                    data.mf_ids.splice(index, 1);
                }
                chrome.storage.sync.set({ "mf_ids": data.mf_ids }, function () { });
                $(ev.target).closest('tr').remove();
            }
        });
    }
});

function getData(fund_id) {
    var url = "https://mf.zerodha.com/api/fund-info?graph_type=normal&scheme_id=" + fund_id + "&session_token=";
    $.ajax({
        url: url,
        async: false,
        success: function(data) {
            var length = data['data']['graph'].length;
            var content = "<tr>";
            // content += "<td style=\"text-align: left; padding-right: 20px; box-shadow: -1px 0px 10px 0px #aaaaaa;\"><a id=\"mutual-fund\" href=\"https://coin.zerodha.com/funds/" + fund_id + "\">" + data['data']['bse_master'][0]['scheme_name'] + "</a></td>";
            content += "<td style=\"text-align: left; padding-right: 20px; box-shadow: -1px 0px 10px 0px #aaaaaa;\"><span class=\"go-to-details\"  href=\"" + fund_id + "\">" + data['data']['bse_master'][0]['scheme_name'] + "</span></td>";
            content += "<td style=\"text-align: center; box-shadow: -1px 0px 10px 0px #aaaaaa;\">" + "&#8377; " + round(data['data']['graph'][length - 1]['y']) + "</td>";

            var todayValue = data['data']['graph'][length - 1]['y'];
            var yesterdayValue = data['data']['graph'][length - 2]['y'];
            var netPercentageChange = (todayValue - yesterdayValue) / todayValue * 100;
            if (netPercentageChange > 0)
                content += "<td id=\"positive-percentage\" style=\"box-shadow: 5px 0px 10px 0px #aaaaaa;\">+" + round(netPercentageChange) + "%</td>";
            else if (netPercentageChange < 0)
                content += "<td id=\"negative-percentage\" style=\"box-shadow: 5px 0px 10px 0px #aaaaaa;\">" + round(netPercentageChange) + "%</td>";
            else
                content += "<td style=\"box-shadow: 5px 0px 10px 0px #aaaaaa;\">" + round(netPercentageChange) + "%</td>";

            content += "<td class=\"remove-fund\" data-value=\"" + fund_id + "\"><img src=\"resources/delete-icon.png\" data-value=\"" + fund_id + "\" /></td>";
            content += "</tr>";

            $("#funds-data").html($("#funds-data").html() + content);
        }
    });
}

function loadData() {
    $("#loading-text").css("display", "block");
    chrome.storage.sync.get("mf_ids", function (data) {
        if (data.mf_ids != undefined && data.mf_ids.length > 0) {
            for (var i = 0; i < data.mf_ids.length; ++i) {
                getData(data.mf_ids[i]);
            }
            $("#funds-table").css("display", "table");
        } else {
            $("#funds-table").css("display", "none");
        }
        $("#loading-text").css("display", "none");
    });
}

loadData();
