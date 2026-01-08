module.exports = (req, res, next) => {
  if (!req.user?.theAdmin) {
    return res.status(403).json({ message: 'Admin access only' });
  }
  next();
};
