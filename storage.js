// storage.js

const STORAGE_KEY = 'encryptedData';

function saveEncryptedData(data) {
    const encryptedData = encryptData(JSON.stringify(data));
    chrome.storage.local.set({ [STORAGE_KEY]: encryptedData });
}

function getEncryptedData(callback) {
    chrome.storage.local.get(STORAGE_KEY, (result) => {
        const encryptedData = result[STORAGE_KEY];
        if (encryptedData) {
            const decryptedData = JSON.parse(decryptData(encryptedData));
            callback(decryptedData);
        } else {
            callback(null);
        }
    });
}