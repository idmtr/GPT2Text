function download(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}

function scrapeConversation() {
    const messageGroups = Array.from(document.querySelectorAll('.group'));
    const messages = messageGroups.map((group) => {
        const isUser = group.querySelector('img[alt="User"]') !== null;
        const isChatGPT = group.querySelector('svg title') !== null && group.querySelector('svg title').textContent === 'ChatGPT';
        const messageText = group.textContent.trim();

        if (isUser) {
            return `User: ${messageText}`;
        } else if (isChatGPT) {
            return `ChatGPT: ${messageText}`;
        }
    });

    const text = messages.filter((message) => message !== undefined).join('\n\n');
    return text;
}
function scrapeConversationAsHtml() {
    const messageGroups = Array.from(document.querySelectorAll('.group'));
    const messages = messageGroups.map((group) => {
        const isUser = group.querySelector('img[alt="User"]') !== null;
        const isChatGPT = group.querySelector('svg title') !== null && group.querySelector('svg title').textContent === 'ChatGPT';
        const messageText = group.textContent.trim();

        if (isUser) {
            const formattedMessage = messageText.replace(/\n/g, '<br>');
            return `<p><strong>User:</strong> ${formattedMessage}</p>`;
        } else if (isChatGPT) {
            const message = group.querySelector('.prose')?.innerHTML;
            const cleanedMessage = message?.replace(/ class=".+?"/g, '').replace(/ [a-z]+?=".+?"/g, '');
            return `<p><strong>ChatGPT:</strong></p>${cleanedMessage}`;
        }
    });

    const html = messages.filter((message) => message !== undefined).join('');
    return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>${html}</body></html>`;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'save_conversation_txt') {
        const conversationText = scrapeConversation();
        download('ChatGPT-Conversation.txt', conversationText, 'text/plain;charset=utf-8');
    } else if (request.action === 'save_conversation_html') {
        const conversationHtml = scrapeConversationAsHtml();
        download('ChatGPT-Conversation.html', conversationHtml, 'text/html;charset=utf-8');
    }
});