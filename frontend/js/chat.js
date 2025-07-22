// chat.js: Sends queries to GPT endpoint (pseudo-code)

document.getElementById('chat-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const input = document.getElementById('user-input').value;
  const responseDiv = document.getElementById('chat-response');
  responseDiv.textContent = 'Thinking...';

  try {
    const res = await fetch('https://your-api-url.onrender.com/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();
    responseDiv.textContent = data.reply || 'No response.';
  } catch (err) {
    responseDiv.textContent = 'Error: Could not connect to chat API.';
  }
});
