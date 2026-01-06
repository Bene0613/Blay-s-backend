const User = require('../../../models/User');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'This email is already in our database' });
    }

    const user = new User({
      firstname,
      lastname,
      email,
      password
    });

    await user.save();

    return res.status(201).json({
      message: 'Signup complete'
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Server error'
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email
      },
      'supersecretkey', 
      { expiresIn: '1h' }
    );

    return res.json({
      message: 'Login successful',
      token
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Server error'
    });
  }
};
