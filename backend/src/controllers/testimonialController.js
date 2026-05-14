import Testimonial from '../models/Testimonial.js';

function deriveInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');
}

export async function getTestimonials(req, res, next) {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) { next(err); }
}

export async function createTestimonial(req, res, next) {
  try {
    const { name, role, quote } = req.body;
    if (!name || !role || !quote) {
      return res.status(400).json({ error: 'Name, role, and quote are required' });
    }
    const initials = deriveInitials(name);
    const testimonial = await Testimonial.create({ name, role, quote, initials });
    res.status(201).json(testimonial);
  } catch (err) { next(err); }
}
