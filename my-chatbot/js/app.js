// js/app.js - main controller (UPDATED)
import { fetchAIReply, checkAPIStatus } from './api.js';
import { ChatUI } from './ui.js';

// DOM elements
const messagesArea = document.getElementById('messagesArea');
const typingIndicator = document.getElementById('typingIndicator');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const clearChatBtn = document.getElementById('clearChatBtn');

// init UI manager
const chatUI = new ChatUI(messagesArea, typingIndicator);

// app state
let isProcessing = false;

// auto-resize textarea
function autoResizeTextarea() {
    userInput.style.height = 'auto';
    userInput.style.height = Math.min(userInput.scrollHeight, 120) + 'px';
}

userInput.addEventListener('input', autoResizeTextarea);

// Send message logic - FIXED
async function sendMessage() {
    if (isProcessing) return;
    
    const message = userInput.value.trim();
    if (!message) return;
    
    // disable input while sending
    isProcessing = true;
    sendBtn.disabled = true;
    userInput.disabled = true;
    
    // add user message
    chatUI.addMessage('user', message);
    userInput.value = '';
    autoResizeTextarea();
    
    // show typing
    chatUI.showTyping(true);
    
    try {
        // fetch AI response
        const reply = await fetchAIReply(message);
        chatUI.showTyping(false);
        chatUI.addMessage('bot', reply);
    } catch (error) {
        chatUI.showTyping(false);
        chatUI.addMessage('bot', "Sorry, I'm having trouble right now. Please try again! 😅", true);
    }
    
    // re-enable
    isProcessing = false;
    sendBtn.disabled = false;
    userInput.disabled = false;
    userInput.focus();
}

// Clear conversation
function clearConversation() {
    if (isProcessing) return;
    const allMessages = document.querySelectorAll('.message');
    allMessages.forEach(msg => msg.remove());
    
    // Add fresh welcome
    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'welcome-message';
    welcomeDiv.innerHTML = `
        <div class="ai-avatar"><i class="fas fa-brain"></i></div>
        <div class="welcome-text">
            <h4>Chat cleared! ✨</h4>
            <p>Ask me anything - I'm ready to help!</p>
            <small><i class="fas fa-smile"></i> Try: "Tell me a joke" or "Help me with coding"</small>
        </div>
    `;
    messagesArea.innerHTML = '';
    messagesArea.appendChild(welcomeDiv);
    chatUI.scrollToBottom();
}

// Event listeners
sendBtn.addEventListener('click', sendMessage);
clearChatBtn.addEventListener('click', clearConversation);
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Initial status
chatUI.updateStatusIndicator('✅ Ready! Ask me anything', false);
userInput.focus();

console.log("Chatbot loaded - Ready to reply!");