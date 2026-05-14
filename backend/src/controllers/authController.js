import jwt from 'jsonwebtoken';
import User from '../models/User.js';

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: 'Email already registered' });
    const user = await User.create({ name, email, password });
    res.status(201).json({ token: signToken(user._id), user: { id: user._id, name, email } });
  } catch (err) { next(err); }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ token: signToken(user._id), user: { id: user._id, name: user.name, email } });
  } catch (err) { next(err); }
}

export async function me(req, res, next) {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) { next(err); }
}
