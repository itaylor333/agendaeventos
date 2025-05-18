const User = require('../models/user');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  const exists = await User.findOne({ username });
  if (exists) return res.status(400).json({ message: 'Usuário já existe' });

  const user = new User({
    username,
    password,
    role: role || 'user'
  });

  await user.save();

  res.status(201).json({
    _id: user._id,
    username: user.username,
    role: user.role,
    token: generateToken(user._id)
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  res.json({
    _id: user._id,
    username: user.username,
    role: user.role,
    token: generateToken(user._id)
  });
};