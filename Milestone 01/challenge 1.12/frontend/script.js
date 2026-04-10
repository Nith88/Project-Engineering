// Conversation history (full context)
const messages = [];

const chatDisplay = document.getElementById('chatDisplay');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

/**
 * Render a message bubble in the chat display
 */
function renderMessage(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', role);
    messageDiv.textContent = content;
    chatDisplay.appendChild(messageDiv);
    
    // Auto-scroll to bottom
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

/**
 * Handle sending the message
 */
async function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    // 1. Add user message to state
    messages.push({ role: "user", content: text });

    // 2. Render user bubble
    renderMessage("user", text);

    // 3. Clear input
    messageInput.value = "";

    // Disable button while loading
    sendBtn.disabled = true;

    try {
        // 4. Call backend /chat route with full message history
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ messages })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Request failed");
        }

        const reply = data.reply;

        // 5. Add assistant response to state
        messages.push({ role: "assistant", content: reply });

        // 6. Render assistant message
        renderMessage("assistant", reply);

    } catch (error) {
        console.error("Error:", error);
        renderMessage("assistant", "⚠️ Error: Unable to get response");
    }

    // Re-enable button
    sendBtn.disabled = false;
}

// Event Listeners
sendBtn.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});