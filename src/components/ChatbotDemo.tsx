'use client';

import { useEffect, useRef, useState } from 'react';
import { Bot, MessageCircle, Send } from 'lucide-react';

interface Message {
  from: 'bot' | 'user';
  text: string;
}

const SEED_MESSAGES: Message[] = [
  { from: 'bot', text: 'Hello! 👋 I\'m your Zyglo AI assistant. I can help you schedule a demo, answer questions, or connect you with our team. How can I help?' },
  { from: 'user', text: 'I need an automated lead system for my real estate business.' },
  { from: 'bot', text: 'Great choice! 🏡 I\'ll set up a WhatsApp bot that auto-captures buyer enquiries, sends property previews and books site visits — no manual work needed. Want a live demo?' },
  { from: 'user', text: 'Yes, show me how it works.' },
  { from: 'bot', text: 'Perfect! ✅ I\'ve sent a demo link to your WhatsApp and scheduled a 30-min walkthrough with our team. What time works best for you today?' },
];

const RULES: { keywords: string[]; reply: string }[] = [
  { keywords: ['price', 'pricing', 'cost', 'how much'], reply: 'Pricing depends on scope — most AI chatbot builds start in the ₹15k–₹40k range. Book a free consultation and we\'ll quote exactly what you need. 💰' },
  { keywords: ['whatsapp'], reply: 'Yep, this runs natively on WhatsApp Business API — no app download needed for your customers. Fully automated, 24/7. 📱' },
  { keywords: ['erp'], reply: 'We also build GST-ready ERP systems that plug straight into this same AI layer — billing, inventory, and leads in one place. Want details?' },
  { keywords: ['demo', 'trial', 'test'], reply: 'I can get you a live walkthrough this week. Tap "Explore AI Chatbots" below or book a free consultation and we\'ll set it up. 🚀' },
  { keywords: ['hindi', 'language', 'english'], reply: 'This bot understands both Hindi and English natural language — customers can message however they\'re comfortable. 🗣️' },
  { keywords: ['hi', 'hello', 'hey'], reply: 'Hey there! 👋 Ask me about pricing, WhatsApp automation, ERP, or anything else — I\'m built to handle real customer conversations like this one.' },
  { keywords: ['human', 'team', 'talk to someone', 'call'], reply: 'Happy to connect you with our team directly — click "Explore AI Chatbots" below and we\'ll follow up within a few hours.' },
];

const FALLBACK_REPLIES = [
  'Good question — our team can walk you through exactly how that works. Want me to set up a free consultation?',
  'That\'s something we handle all the time. I\'ll flag this for our team so they can give you a proper answer — tap below to book a call.',
  'I\'ve noted that down. For a detailed answer tailored to your business, book a free consultation with our team below. 👇',
];

function pickReply(userText: string): string {
  const lower = userText.toLowerCase();
  for (const rule of RULES) {
    if (rule.keywords.some((k) => lower.includes(k))) return rule.reply;
  }
  return FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)];
}

export function ChatbotDemo() {
  const [messages, setMessages] = useState<Message[]>(SEED_MESSAGES);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  function handleSend() {
    const text = input.trim();
    if (!text || typing) return;

    setMessages((prev) => [...prev, { from: 'user', text }]);
    setInput('');
    setTyping(true);

    const delay = 700 + Math.random() * 700;
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: pickReply(text) }]);
      setTyping(false);
    }, delay);
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0B1424] overflow-hidden shadow-[0_16px_60px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-[#0F1C32]/80 px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/20">
          <Bot className="h-4 w-4 text-cyan-400" />
        </div>
        <div>
          <p className="text-[13px] font-bold text-white">Zyglo AI Bot</p>
          <p className="text-[11px] text-green-400">● Online — Responding instantly</p>
        </div>
        <span className="ml-auto rounded-lg bg-[#25D366]/10 px-3 py-1 text-[10px] font-bold text-[#25D366]">
          WhatsApp
        </span>
      </div>

      <div ref={scrollRef} className="max-h-[420px] space-y-4 overflow-y-auto p-5">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-[13px] leading-6 ${msg.from === 'bot'
              ? 'rounded-tl-sm bg-[#0F1C32] text-slate-200'
              : 'rounded-tr-sm text-white'
              }`}
              style={msg.from === 'user' ? { background: 'rgba(6,204,232,0.12)' } : {}}>
              {msg.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-[#0F1C32] px-4 py-3.5">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500" style={{ animationDelay: '0ms' }} />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500" style={{ animationDelay: '150ms' }} />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-white/[0.06] px-4 py-3">
        <div className="flex items-center gap-3 rounded-xl bg-[#0F1C32]/80 px-4 py-2.5">
          <MessageCircle className="h-4 w-4 shrink-0 text-cyan-400" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-slate-500"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || typing}
            aria-label="Send message"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-cyan-400 transition disabled:opacity-30 enabled:hover:bg-cyan-400/10">
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
