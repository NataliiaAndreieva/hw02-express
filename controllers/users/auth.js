const bcrypt = require('bcrypt');

const { User } = require('../../models/user');

const { HttpError, ctrlWrapper } = require('../../helpers');

const register = async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
    const newUser = await User.create({...req.body, password: hash});

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
}

module.exports = {
  register: ctrlWrapper(register),
};