function round(num) {
  return Math.round(num * 100) / 100;
}

$("#fund-options").click(function(ev) {
    $("#fund-options").css("display", "none");
    $("#fund").val(ev.target.innerHTML.split("<br>")[0]);
    window.localStorage.setItem("mf_fund_id", ev.target.id);
    $("#fund-options").html("");
});

$("#funds-list").click(function() {
    chrome.tabs.create({url: "https://mf.zerodha.com/funds", active: false});
});

$("#add-mutual-fund").click(function() {
    var mfId = window.localStorage.getItem("mf_fund_id");
    $("#funds-table").css("display", "table");
    chrome.storage.local.get("mf_ids", function(data) {
        if (data == undefined || $.isEmptyObject(data)) {
            data = {};
            data.mf_ids = [];
        }
        data.mf_ids.push(mfId);
        chrome.storage.local.set({"mf_ids": data.mf_ids}, function(){});
        getData(mfId);
        window.localStorage.removeItem("mf_fund_id");
        $("#fund").val("");
    });
});

$("#check").click(function() {
    chrome.storage.local.get("mf_ids", function(data) {
        if (data.mf_ids != undefined) {
            alert(JSON.stringify(data.mf_ids));
        } else {
            alert("Nothing stored yet!");
        }
    });
});

$("#clear").click(function() {
    chrome.storage.local.clear();
    $("#funds-data").html("");
    $("#funds-table").css("display", "none");
});

$("#fund").keyup(function() {
    var str = $("#fund").val();
    str = new RegExp(str, "i");
    
    var matches = autoCompleteData.filter(function(mf) {
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

function getData(url) {
    var url = "https://mf.zerodha.com/api/fund-info?graph_type=normal&scheme_id=" + url + "&session_token=";
    $.get(url, function(data) {
        var length = data['data']['graph'].length;
        var content = "<tr>";
        content += "<td>" + data['data']['bse_master'][0]['scheme_name'] + "</td>";
        content += "<td>" + data['data']['graph'][length-1]['y'] + "</td>";

        var todayValue = data['data']['graph'][length-1]['y'];
        var yesterdayValue = data['data']['graph'][length-2]['y'];
        var netPercentageChange = (todayValue - yesterdayValue) / todayValue * 100;
        // netPercentageChange = String(netPercentageChange) + " %";
        if (netPercentageChange > 0)
            content += "<td id=\"positive-percentage\">" + round(netPercentageChange) + "%</td></tr>";
        else if (netPercentageChange < 0)
            content += "<td id=\"negative-percentage\">" + round(netPercentageChange) + " %</td></tr>";
        else
            content += "<td>" + round(netPercentageChange) + " %</td></tr>";

        $("#funds-data").html($("#funds-data").html() + content);
    });
}

function loadData() {
    $("#funds-data").html("");
    chrome.storage.local.get("mf_ids", function(data) {
        if (data.mf_ids != undefined && data.mf_ids.length > 0) {
            $("#funds-table").css("display", "table");
            for (var i = 0; i < data.mf_ids.length; ++i) {
                getData(data.mf_ids[i]);
            }
        } else {
            $("#funds-table").css("display", "none");
        }
    });
}

loadData();