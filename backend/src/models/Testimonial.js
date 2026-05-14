import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  role:     { type: String, required: true, trim: true },
  quote:    { type: String, required: true, trim: true },
  initials: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);
