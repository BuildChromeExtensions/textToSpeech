// when extension is installe create context menu
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({ id: "speak", title: "Read", contexts: ["selection"] })
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId == 'speak') {

        // get text
        const text = info.selectionText;

        // read out text
        chrome.tts.speak(text);
    }
});