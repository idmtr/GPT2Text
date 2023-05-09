chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'save_conversation') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['content.js']
        });
      });
    }
  });
  