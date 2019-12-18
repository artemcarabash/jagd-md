var oldDeersVal = 0; // init value
function injectTheScript() {
    // Gets all tabs that have the specified properties, or all tabs if no properties are specified (in our case we choose current active tab)
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // Injects JavaScript code into a page
        chrome.tabs.executeScript(tabs[0].id, {file: "utilities.js"});
        chrome.storage.local.set({'tabIndex': 0, 'catchDeers': oldDeersVal, 'start': true});
    });
}

function stopSearch(){
    chrome.storage.local.set({'start':false});
    chrome.storage.local.get(['catchDeers'], function (data) {
        oldDeersVal = data.catchDeers;
    });
}

// adding listener to your button in popup window
document.getElementById('start').addEventListener('click', injectTheScript);
document.getElementById('stop').addEventListener('click', stopSearch);


