document.getElementById('startBtn').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'startMonitoring' }, (response) => {
        console.log('Response from background:', response.status);
    });
});

document.getElementById('stopBtn').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'stopMonitoring' }, (response) => {
        console.log('Response from background:', response.status);
    });
});

document.getElementById('sendTestBtn').addEventListener('click', () => {
    const keyword = document.getElementById('keywordInput').value;
    if (keyword) {
        fetch(`http://localhost:3000/send-message?keyword=${encodeURIComponent(keyword)}`)
            .then(response => response.text())
            .then(data => {
                console.log('Test message sent:', data);
            })
            .catch(error => {
                console.log('❌ Error sending test message:', error);
            });
    } else {
        console.log('❌ Please enter a keyword.');
    }
});
