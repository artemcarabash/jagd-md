


chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
    console.log('!!!!!!!onUpdated on background ');
    if (tab.url.indexOf("https://www.mydealz.de/") > -1 && changeInfo.url === undefined && changeInfo.status === "complete"){
        chrome.tabs.executeScript(tabId, {file: "utilities.js"});
    }
});


// chrome.tabs.onActivated.addListener(function(activeInfo) {
//     // how to fetch tab url using activeInfo.tabid
//     console.log(' onActivated on background ' + activeInfo);
//     chrome.tabs.get(activeInfo.tabId, function(tab){
//         console.log(tab.url);
//     });
// });
//
// chrome.webNavigation.onTabReplaced.addListener(function (details) {
//     chrome.tabs.get(details.tabId, function(tab) {
//         console.log("onTabReplaced" + tab.url);
//     });
// });

