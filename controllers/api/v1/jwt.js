const jwt = require('jsonwebtoken');

const JWT_SECRET = 'supersecretkey'; // later move to .env

function createToken(user) {
  const theAdmin = user.email === 'admin@admin.com';

  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      theAdmin: user.theAdmin
    },
    JWT_SECRET,
    { expiresIn: '1d' }
  );
}

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

   
    req.user = decoded;
    next();
  });
}

module.exports = {
  createToken,
  verifyToken
};
