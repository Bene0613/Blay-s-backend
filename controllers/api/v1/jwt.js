const jwt = require('jsonwebtoken');

const JWT_SECRET = 'supersecretkey'; // later move to .env

function createToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
}

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Bearer TOKEN

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
}

module.exports = {
  createToken,
  verifyToken
};
