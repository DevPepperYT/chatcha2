const menuButton = document.querySelector('.menu-button');
const container = document.querySelector('.container');
const chatContainer = document.querySelector('.chat-container');
const sendButton = document.querySelector('#send-button');
const messageInput = document.querySelector('#message-input');
const fileUpload = document.querySelector('#file-upload');

menuButton.addEventListener('click', () => {
    container.style.opacity = 0;
    container.style.visibility = 'hidden';
    setTimeout(() => {
        chatContainer.style.opacity = 1;
        chatContainer.style.visibility = 'visible';
    }, 1000);
});

sendButton.addEventListener('click', () => {
    const messageText = messageInput.value;
    const file = fileUpload.files[0];

    if (messageText.trim() || file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const newMessage = document.createElement('div');
            newMessage.classList.add('chat-message');
            
            if (file) {
                const img = document.createElement('img');
                img.src = e.target.result;
                newMessage.appendChild(img);
            }

            const text = document.createElement('div');
            text.classList.add('message-text');
            text.textContent = messageText;
            newMessage.appendChild(text);

            chatContainer.appendChild(newMessage);
            messageInput.value = '';
            fileUpload.value = '';
        };
        
        if (file) {
            reader.readAsDataURL(file);
        }
    }
});
