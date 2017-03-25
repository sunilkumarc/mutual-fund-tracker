function round(num) {
  return Math.round(num * 100) / 100;
}

$("#fund").keyup(function() {
    var str = $("#fund").val();
    str = new RegExp(str, "i");
    var matches = autoCompleteData.filter(function(mf) {
        var res = mf["name"].match(str);
        return res;
    });
    var content = "";
    for (var i = 0; i < matches.length; ++i) {
        content += "<div>" + matches[i].name + "<br/>(" + matches[i].desc + ")" + "</div>";
    }
    $("#fund-options").html(content);
});

// $("#funds-data").html(autoCompleteData[0]["name"]);

// $.get("https://mf.zerodha.com/api/fund-info?graph_type=normal&scheme_id=14051732.00206600&session_token=", function(data) {
//     var length = data['data']['graph'].length;
//     content = data['data']['bse_master'][0]['scheme_name'];
//     content += "......" + data['data']['graph'][length-1]['y'];

//     var todayValue = data['data']['graph'][length-1]['y'];
//     var yesterdayValue = data['data']['graph'][length-2]['y'];
//     var netPercentageChange = (todayValue - yesterdayValue) / todayValue * 100;
//     content += "......" + round(netPercentageChange) + "<br>"
//     $("#funds-data").html($("#funds-data").html() + content);
// });

// $.get("https://mf.zerodha.com/api/fund-info?graph_type=normal&scheme_id=14050080.00206600&session_token=", function(data) {
//     var length = data['data']['graph'].length;
//     content = data['data']['bse_master'][0]['scheme_name'];
//     content += "......" + data['data']['graph'][length-1]['y'];

//     var todayValue = data['data']['graph'][length-1]['y'];
//     var yesterdayValue = data['data']['graph'][length-2]['y'];
//     var netPercentageChange = (todayValue - yesterdayValue) / todayValue * 100;
//     content += "......" + round(netPercentageChange) + "<br>"
//     $("#funds-data").html($("#funds-data").html() + content);
// });

