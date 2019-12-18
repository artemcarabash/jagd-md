var catchDeers;
var tabIndex;

chrome.storage.local.get(['tabIndex', 'catchDeers'], function (data) {
    catchDeers = data.catchDeers;
    tabIndex = data.tabIndex;

});

function clickTheMagicButton() {
    // btn btn--square navDropDown-btn navDropDown-trigger  messages button
    //
    // icon icon--refresh space--ml-2                       update button
    //btn mc-btn--primary text--upper width--all-12         magic button
    //btn mc-btn--primary text--upper width--all-12

    // first we will look for the update deals button

    var updateButton = document.getElementsByClassName("icon icon--refresh space--ml-2 ")[0];
    //if we will find it then click on it
    if(updateButton){
        updateButton.parentElement.click();
        console.log('update found');
    }


    var magicButton = document.getElementsByClassName("btn mc-btn--primary text--upper width--all-12")[0];

    if(magicButton){
        catchDeers ++ ;
        chrome.storage.local.set({'catchDeers':catchDeers});
        console.warn('!!!!!!!!!!!!found MAGIC button will click it');
        // alert("found MAGIC button will click it");
        magicButton.click(); // use parentElement for update
        setTimeout(function(){

            var closeButton = document.getElementsByClassName("btn btn--mode-dark btn--circle")[0];
            if(closeButton) {
                console.warn('found CLOSE button will click it');
                closeButton.click();
            } else {
                console.warn('CLOSE button not found');
            }

            }, 1000);
    } else {
        console.log('nothing found ' + catchDeers);
        return;
    }

}


function searchForButton() {
    switchBetweenTabs();
    var interval = setInterval(function() {
        chrome.storage.local.get(['start'], function (data) {
            // console.log(data.start);
            if(data.start){
                clickTheMagicButton()
            } else {
                if(interval)
                    clearInterval(interval);
            }
        });
    }, 2000);

}




function switchBetweenTabs() {

    var highlightsTab = document.getElementsByClassName("subNavMenu-item--separator cept-sort-tab test-tablink-highlights")[0];
    var hotTab = document.getElementsByClassName("subNavMenu-item--separator cept-sort-tab test-tablink-hot")[0];
    var newTab = document.getElementsByClassName("subNavMenu-item--separator cept-sort-tab test-tablink-new")[0];
    var discussedTab = document.getElementsByClassName("subNavMenu-item--separator cept-sort-tab test-tablink-discussed")[0];

    var tabs = [highlightsTab, hotTab, newTab, discussedTab];

    var switchInterval = setInterval(function () {
        chrome.storage.local.get(['start'], function (data) {
            if(data.start){
                var index = Math.floor(Math.random() * 4);
                console.log('switch to next tab number ->' + index+1);
                tabs[index].firstChild.click();
            } else {
                clearInterval(switchInterval)
            }

        });
        //this can be used to switch between tabs not randomly...
        // console.log(tabIndex);
        // tabIndex ++;
        // chrome.storage.local.set({'tabIndex':tabIndex});
        //
        // if(tabIndex >= 4) chrome.storage.local.set({'tabIndex':0});
    }, 3 * 60 * 1000); // 5 * 60 or 20 sec


}

searchForButton();