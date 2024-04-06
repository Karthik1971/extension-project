// background.js

let loginDetails = {};

function captureLoginDetails() {
    // Capture username, password, and login URL
    chrome.tabs.executeScript({
        code: `
            let username = document.querySelector('input[type="text"]').value;
            let password = document.querySelector('input[type="password"]').value;
            let loginUrl = window.location.href;
            username && password && loginUrl ? chrome.runtime.sendMessage({ type: 'loginDetails', data: { username, password, loginUrl } }) : null;
        `
    });
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.type === 'loginDetails') {
        loginDetails = message.data;
        // Save or update loginDetails in storage
        // Implement encryption and storage functions here
    }
});

// Call captureLoginDetails() when a new tab is activated
chrome.tabs.onActivated.addListener(function(activeInfo) {
    captureLoginDetails();
});
// background.js

let passwordResetReminders = [];

function setPasswordResetReminder(loginUrl, resetTime) {
    const reminder = {
        loginUrl: loginUrl,
        resetTime: resetTime
    };
    passwordResetReminders.push(reminder);
    // Save or update passwordResetReminders in storage
    // Implement reminder notification logic here
}
// background.js

function checkPasswordExpiration() {
    // Check if any password reset reminders have expired
    const currentTime = new Date().getTime();
    for (let reminder of passwordResetReminders) {
        if (currentTime >= reminder.resetTime) {
            // Display notification to reset password for the loginUrl
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'images/icon48.png',
                title: 'Password Reset Reminder',
                message: 'It is time to reset your password for ' + reminder.loginUrl
            });

            // Prevent user from using other browser functions until password is reset
            chrome.windows.create({
                url: 'expired-password.html',
                type: 'popup',
                focused: true
            });
        }
    }
}
// background.js

const passwordExpiredPage = 'expired-password.html';

function loadExpiredPasswordPage() {
    // Load the expired password page for password reset
    chrome.tabs.create({ url: chrome.runtime.getURL(passwordExpiredPage) });
}



// background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'loginDetails') {
        const encryptedData = encryptData(JSON.stringify(message.data));
        saveEncryptedData(encryptedData);
        sendResponse({ success: true, message: 'Login details securely stored.' });
    }
});

