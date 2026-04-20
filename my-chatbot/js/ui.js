// js/ui.js - DOM manipulation & dynamic rendering
export class ChatUI {
    constructor(messagesArea, typingIndicator) {
        this.messagesArea = messagesArea;
        this.typingIndicator = typingIndicator;
    }

    showTyping(show) {
        this.typingIndicator.style.display = show ? 'flex' : 'none';
        if (show) {
            this.scrollToBottom();
        }
    }

    addMessage(role, content, isError = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        if (role === 'user') {
            avatarDiv.innerHTML = '<i class="fas fa-user-astronaut"></i>';
        } else {
            avatarDiv.innerHTML = '<i class="fas fa-robot"></i>';
        }
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        if (isError && role === 'bot') {
            contentDiv.style.background = "rgba(220, 38, 38, 0.2)";
            contentDiv.style.borderLeft = "3px solid #ef4444";
        }
        // Support markdown-like line breaks
        contentDiv.innerText = content;
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        this.messagesArea.appendChild(messageDiv);
        this.scrollToBottom();
        return messageDiv;
    }
    
    clearMessages(keepWelcome = true) {
        // Remove all children except the welcome message if keepWelcome is true
        const children = Array.from(this.messagesArea.children);
        for (let child of children) {
            if (keepWelcome && child.classList && child.classList.contains('welcome-message')) {
                continue;
            }
            if (child.classList && child.classList.contains('message')) {
                child.remove();
            }
        }
        if (!keepWelcome) {
            const welcome = this.messagesArea.querySelector('.welcome-message');
            if(welcome) welcome.remove();
        }
    }
    
    scrollToBottom() {
        const wrapper = document.querySelector('.messages-wrapper');
        if (wrapper) {
            wrapper.scrollTop = wrapper.scrollHeight;
        }
    }
    
    updateStatusIndicator(text, isError = false) {
        const indicator = document.getElementById('apiStatusIndicator');
        if (indicator) {
            indicator.innerHTML = `<i class="fas ${isError ? 'fa-exclamation-triangle' : 'fa-wifi'}"></i> ${text}`;
            if(isError) indicator.style.color = "#f97316";
            else indicator.style.color = "#9bb5e0";
        }
    }
}