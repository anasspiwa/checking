chrome.runtime.onInstalled.addListener(() => {
  console.log("WhatsApp Keyword Notifier Extension Installed!");
});

// You can use event listeners for runtime messaging, or do other background tasks
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "sendMessage") {
    const { keyword } = message;
    fetch(`http://localhost:3000/send-message?keyword=${encodeURIComponent(keyword)}`)
      .then(response => response.text())
      .then(data => {
        console.log('✅ Message sent:', data);
      })
      .catch(error => {
        console.log('❌ Error sending message:', error);
      });
  }
});
