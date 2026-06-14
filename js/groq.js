// ─── CONFIG ─────────────────────────────────────────────────────────────────
const GROQ_API_KEY = "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"; // Replace with your actual key
const MODEL = "llama3-8b-8192";

// ─── CORE API CALL ──────────────────────────────────────────────────────────
async function askGroq(systemPrompt, userMessage, onChunk) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      max_tokens: 1200,
      temperature: 0.7,
      stream: true
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Groq API error: ${err}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split("\n").filter(l => l.startsWith("data: ") && l !== "data: [DONE]");

    for (const line of lines) {
      try {
        const json = JSON.parse(line.slice(6));
        const delta = json.choices?.[0]?.delta?.content || "";
        if (delta) {
          fullText += delta;
          if (onChunk) onChunk(fullText);
        }
      } catch {}
    }
  }

  return fullText;
}

// ─── SIMPLE MARKDOWN TO HTML ─────────────────────────────────────────────────
function renderMarkdown(text) {
  return text
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^---$/gm, '<hr>')
    .replace(/^\* (.+)$/gm, '<li>$1</li>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`)
    .replace(/\n\n+/g, '</p><p>')
    .replace(/^(?!<[h|u|l|h])/gm, '')
    .replace(/(.+)/s, '<p>$1</p>');
}

// ─── SHOW / HIDE LOADING ─────────────────────────────────────────────────────
function showLoading(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.add('visible'); }
}

function hideLoading(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.remove('visible'); }
}

function showResponse(id, html) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('visible');
    el.innerHTML = html;
  }
}

// ─── FLOATING CHAT WIDGET ────────────────────────────────────────────────────
const GENERAL_SYSTEM = `You are CampusBot, the AI assistant for CampusCopilot — India's smartest college decision platform.
You help students with college choices, career guidance, entrance exams, admission processes, and campus life.
Be concise, friendly, and specific to Indian higher education. Use relevant emojis sparingly.
Always end with a helpful follow-up suggestion.`;

let chatHistory = [];

function initChatWidget() {
  const fab = document.getElementById('chat-fab');
  const modal = document.getElementById('chat-modal');
  const closeBtn = document.getElementById('chat-close');
  const sendBtn = document.getElementById('chat-send');
  const input = document.getElementById('chat-input');
  const messages = document.getElementById('chat-messages');

  if (!fab) return;

  fab.addEventListener('click', () => modal.classList.toggle('open'));
  closeBtn.addEventListener('click', () => modal.classList.remove('open'));

  sendBtn.addEventListener('click', sendChatMessage);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChatMessage(); }
  });

  // Welcome message
  addBotMessage("👋 Hi! I'm CampusBot. Ask me anything about colleges, careers, or admissions in India!");
}

function addBotMessage(text) {
  const messages = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
  return div;
}

function addUserMessage(text) {
  const messages = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'chat-msg user';
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

async function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const messages = document.getElementById('chat-messages');
  const text = input.value.trim();
  if (!text) return;

  addUserMessage(text);
  input.value = '';

  const botDiv = addBotMessage('...');

  try {
    chatHistory.push({ role: 'user', content: text });
    await askGroq(GENERAL_SYSTEM, chatHistory.map(m => `${m.role}: ${m.content}`).join('\n'), (partial) => {
      botDiv.textContent = partial;
      messages.scrollTop = messages.scrollHeight;
    });
    chatHistory.push({ role: 'assistant', content: botDiv.textContent });
  } catch (e) {
    botDiv.textContent = '⚠️ Error connecting. Check your API key.';
  }
}

document.addEventListener('DOMContentLoaded', initChatWidget);
