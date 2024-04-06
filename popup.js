// popup.js

function displayPopupNotification(message) {
    // Display popup notification with the message
    const notificationElement = document.getElementById('notification');
    notificationElement.innerText = message;
    notificationElement.style.display = 'block'; // Show the notification
}

document.addEventListener('DOMContentLoaded', function () {
    const notificationElement = document.getElementById('notification');

    if (notificationElement) {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.type === 'notification') {
                notificationElement.innerText = message.content;
                notificationElement.style.display = 'block'; // Show the notification
            }
        });
    }
});

function generateStrongPassword() {
    // Generate a new strong password
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    const allChars = uppercase + lowercase + numbers + symbols;

    let password = '';
    for (let i = 0; i < 12; i++) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    return password;
}

// Example usage
displayPopupNotification('Password reset reminder: It is time to reset your password.');
let newPassword = generateStrongPassword();
console.log('Generated new password:', newPassword);