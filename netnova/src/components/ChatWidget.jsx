import { useState, useRef, useEffect } from 'react'

const QUICK_REPLIES = ['Services', 'Pricing', 'Contact', 'Network install', 'About us']
const API_URL = '/api/chat'

function BotBubble({ text }) {
  return <div className="chat-bubble chat-bot">{text}</div>
}

function UserBubble({ text }) {
  return <div className="chat-bubble chat-user">{text}</div>
}

function Typing() {
  return (
    <div className="chat-bubble chat-bot flex gap-1 items-center" style={{ padding: '10px 14px' }}>
      <span className="typing-dot" />
      <span className="typing-dot" />
      <span className="typing-dot" />
    </div>
  )
}

export default function ChatWidget() {
  const [open, setOpen]         = useState(false)
  const [greeted, setGreeted]   = useState(false)
  const [messages, setMessages] = useState([])
  const [history, setHistory]   = useState([])
  const [typing, setTyping]     = useState(false)
  const [input, setInput]       = useState('')
  const [showBadge, setShowBadge] = useState(true)
  const [error, setError]       = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  function toggle() {
    setOpen(o => {
      const next = !o
      setShowBadge(false)
      if (next && !greeted) {
        setGreeted(true)
        setTimeout(() => {
          setMessages([{ role: 'bot', text: "👋 Hi! I'm the NetNova AI assistant powered by Gemini. Ask me anything about our services, pricing, or team!" }])
        }, 220)
      }
      return next
    })
  }

  async function send(text) {
    const val = (text || input).trim()
    if (!val || typing) return
    setInput('')
    setError(null)

    const userMsg = { role: 'user', text: val }
    setMessages(m => [...m, userMsg])
    setTyping(true)

    const newHistory = [...history, { role: 'user', content: val }]

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newHistory }),
      })

      const data = await res.json()

      if (!res.ok) {
        const msg = res.status === 429
          ? '⏳ AI is rate-limited right now. Please wait a moment and try again.'
          : `⚠️ ${data.error || 'Something went wrong. Please try again.'}`
        setMessages(m => [...m, { role: 'bot', text: msg }])
        return
      }

      setMessages(m => [...m, { role: 'bot', text: data.reply }])
      setHistory([...newHistory, { role: 'model', content: data.reply }])
    } catch {
      setMessages(m => [...m, { role: 'bot', text: '⚠️ Cannot reach the server. Make sure the backend is running.' }])
    } finally {
      setTyping(false)
    }
  }

  return (
    <div className="fixed bottom-7 right-7 z-50">
      {/* Toggle button */}
      <button className="chat-toggle-btn" aria-label="Open chat" onClick={toggle}>
        {showBadge && (
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
            style={{ background: '#8B5CF6', color: '#ffffff', border: '2px solid var(--bg)' }}
          >1</span>
        )}
        {open ? (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      <div className={`chat-panel ${open ? '' : 'closed'}`} role="dialog" aria-label="NetNova chat">

        {/* Header */}
        <div style={{
          padding: '14px 16px',
          background: 'linear-gradient(135deg,rgba(139,92,246,0.1),rgba(96,165,250,0.06))',
          borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div className="flex items-center gap-3">
            <img src="/brand_assest/image.png" alt="NetNova" style={{ height: 30, width: 'auto' }} />
            <div>
              <div className="font-display font-semibold text-sm" style={{ color: 'var(--text-1)' }}>NetNova Assistant</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#22c55e', boxShadow: '0 0 5px #22c55e' }} />
                <span className="text-xs" style={{ color: 'var(--text-3)' }}>AI · Powered by Gemini</span>
              </div>
            </div>
          </div>
          <button
            onClick={toggle}
            aria-label="Close chat"
            className="chat-close-btn w-7 h-7 rounded-full flex items-center justify-center cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" style={{ color: 'var(--text-3)' }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 8px', display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 310, minHeight: 200 }}>
          {messages.map((m, i) =>
            m.role === 'bot' ? <BotBubble key={i} text={m.text} /> : <UserBubble key={i} text={m.text} />
          )}
          {typing && <Typing />}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick replies */}
        <div style={{ padding: '6px 14px 8px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {QUICK_REPLIES.map(q => (
            <button key={q} className="quick-chip" onClick={() => send(q)} disabled={typing}>{q}</button>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: '10px 12px', borderTop: '1px solid var(--border)', display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Ask anything about NetNova…"
            maxLength={300}
            disabled={typing}
            className="flex-1 rounded-full text-sm outline-none"
            style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border)',
              padding: '8px 14px',
              color: 'var(--text-1)',
              caretColor: '#8B5CF6',
              fontFamily: 'Inter, sans-serif',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              opacity: typing ? 0.6 : 1,
            }}
            onFocus={e => { e.target.style.borderColor = 'rgba(139,92,246,0.55)'; e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.1)' }}
            onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
          />
          <button
            onClick={() => send()}
            aria-label="Send"
            disabled={typing}
            className="flex-shrink-0 flex items-center justify-center rounded-full border-none cursor-pointer"
            style={{
              width: 34, height: 34,
              background: 'linear-gradient(135deg,#7C3AED,#3B82F6)',
              boxShadow: '0 0 12px rgba(124,58,237,0.4)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              opacity: typing ? 0.6 : 1,
            }}
            onMouseOver={e => { if (!typing) { e.currentTarget.style.transform = 'scale(1.12)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(124,58,237,0.6)' } }}
            onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(124,58,237,0.4)' }}
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
