function saveConversationTxt() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'save_conversation_txt' });
    });
}

function saveConversationHtml() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'save_conversation_html' });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('save-txt').addEventListener('click', saveConversationTxt);
    document.getElementById('save-html').addEventListener('click', saveConversationHtml);
});