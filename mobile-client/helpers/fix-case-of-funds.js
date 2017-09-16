let FundsList = require('./mf_data.js').FundsList;
let fs = require('fs');

function fixCase(name) {
    let result = '';
    if (name.length > 0) {
        let firstLetter = true;
        let i = 0;
        while (i < name.length) {
            if (firstLetter) {
                if (name.charCodeAt(i) >= 97 && name.charCodeAt(i) <= 122)
                    result += String.fromCharCode(name.charCodeAt(i) - 32);
                else result += name[i];
                firstLetter = false;
            } else if (name[i] == ' ') {
                result += name[i];
                firstLetter = true;
            } else if (!firstLetter) {
                if (name.charCodeAt(i) >= 65 && name.charCodeAt(i) <= 90)
                    result += String.fromCharCode(name.charCodeAt(i) + 32);
                else result += name[i];
            }
            i += 1;
        }
    }
    return result;
}

for (let i = 0; i < FundsList.length; ++i) {
    let name = FundsList[i].name;
    FundsList[i].name = fixCase(name);
}

fs.writeFile('./result.js', JSON.stringify(FundsList), (err) => {
    console.log(err);
});