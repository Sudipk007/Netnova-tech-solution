import Contact from '../models/Contact.js';
import { sendContactEmail } from '../services/emailService.js';

export async function submitContact(req, res, next) {
  try {
    const { name, email, company, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: 'Name, email, and message are required' });

    await Contact.create({ name, email, company, message });
    await sendContactEmail({ name, email, company, message });

    res.status(201).json({ success: true, message: "Message received. We'll respond within 24 hours." });
  } catch (err) { next(err); }
}
