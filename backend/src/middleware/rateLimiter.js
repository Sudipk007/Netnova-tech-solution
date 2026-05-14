import rateLimit from 'express-rate-limit';

export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many requests, please try again later.' },
});

export const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: 'Too many messages, slow down.' },
});
