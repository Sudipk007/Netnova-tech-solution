import { getAIReply } from '../services/aiService.js';

export async function chat(req, res, next) {
  try {
    const { messages } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array is required' });
    }
    const reply = await getAIReply(messages);
    res.json({ reply });
  } catch (err) {
    if (err.message?.includes('429')) {
      return res.status(429).json({ error: 'AI quota exceeded. Please try again in a moment.' });
    }
    next(err);
  }
}
