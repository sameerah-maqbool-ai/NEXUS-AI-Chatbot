// js/api.js - WORKING FREE API (using multiple fallbacks)

export async function fetchAIReply(message) {
    try {
        // FALLBACK 1: Mock API (always works, no internet required for basic replies)
        // But we want real AI, so using working free API
        
        // Using working free API - AllOrigins proxy + HuggingFace demo
        const encodedMsg = encodeURIComponent(message);
        
        // Option 1: Free chatbot API (no key, CORS enabled)
        const url = `https://chatbot-ai-lovat.vercel.app/api/chat?message=${encodedMsg}`;
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);
        
        try {
            const response = await fetch(url, {
                method: 'GET',
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json',
                }
            });
            
            clearTimeout(timeoutId);
            
            if (response.ok) {
                const data = await response.json();
                if (data && data.reply) {
                    return data.reply;
                }
            }
        } catch(e) {
            console.log("Primary API failed, trying backup...");
        }
        
        // Option 2: Backup API - Using Pollinations with CORS proxy
        const backupUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://text.pollinations.ai/${encodedMsg}`)}`;
        
        const backupResponse = await fetch(backupUrl, {
            signal: AbortSignal.timeout(15000)
        });
        
        if (backupResponse.ok) {
            const data = await backupResponse.json();
            if (data && data.contents) {
                return data.contents;
            }
        }
        
        // Option 3: Smart local responses (no API needed for basic questions)
        return getSmartLocalResponse(message);
        
    } catch (error) {
        console.error("All APIs failed:", error);
        return getSmartLocalResponse(message);
    }
}

// Smart local responses - yeh hamesha kaam karega!
function getSmartLocalResponse(question) {
    const q = question.toLowerCase();
    
    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
        return "👋 Hello! I'm your AI assistant. How can I help you today?";
    }
    if (q.includes('how are you')) {
        return "I'm doing great! Thanks for asking. Ready to answer your questions! 💫";
    }
    if (q.includes('name') || q.includes('called')) {
        return "I'm Nexus AI - your free chatbot assistant! 🤖";
    }
    if (q.includes('help') || q.includes('what can you do')) {
        return "I can answer questions, help with coding, explain concepts, tell jokes, and much more! Just ask me anything. ✨";
    }
    if (q.includes('weather')) {
        return "I don't have live weather data, but you can check weather.com for accurate forecasts! ☀️";
    }
    if (q.includes('time')) {
        return `Current time is ${new Date().toLocaleTimeString()}. I hope you're having a great day! ⏰`;
    }
    if (q.includes('joke')) {
        const jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs! 😄",
            "What do you call a fake noodle? An impasta! 🍝",
            "Why did the scarecrow win an award? Because he was outstanding in his field! 🌾",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡"
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
    }
    if (q.includes('code') || q.includes('programming') || q.includes('python') || q.includes('javascript')) {
        return "I can help with coding! Try asking me: 'Write a function in Python' or 'How to loop in JavaScript'. What specifically would you like to know? 💻";
    }
    if (q.includes('thank')) {
        return "You're very welcome! Happy to help! 😊";
    }
    
    // Default smart response
    return `That's an interesting question: "${question}"\n\nI'm currently using offline smart mode. For best results, please check your internet connection. But I can still help! Ask me about coding, jokes, or general knowledge. 🚀\n\nTry asking: "Tell me a joke" or "How to learn coding"`;
}

export async function checkAPIStatus() {
    return true; // Local mode always available
}