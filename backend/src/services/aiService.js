import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API);
const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
  systemInstruction: `You are the NetNova website assistant. NetNova is a tech company offering:
- Cloud Infrastructure (multi-cloud, Kubernetes, zero-downtime deploys)
- AI & Machine Learning (custom models, LLM integrations, automation)
- Cybersecurity (threat modeling, pen testing, SOC2, ISO 27001)
- Software Engineering (full-stack, SaaS, APIs, mobile)
- Data Engineering (pipelines, analytics, warehousing)
- Digital Transformation (legacy modernization, roadmaps)
- Network Device Installation (routers, switches, firewalls)

Stats: 200+ global clients, 99.9% uptime SLA, 48h avg deploy, 12yr experience.
Keep answers concise and helpful. Direct complex questions to the contact form.`,
});

export async function getAIReply(messages) {
  // Convert {role, content} to Google's {role: user/model, parts: [{text}]} format
  const history = messages.slice(0, -1).map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const lastMessage = messages.at(-1).content;

  const chat = model.startChat({ history });
  const result = await chat.sendMessage(lastMessage);
  return result.response.text();
}
