const userService = require('./user.service');

exports.createUser = (req, res, next) => {
  try {
    const user = userService.createUser(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

exports.getUsers = (req, res, next) => {
  try {
    const users = userService.getUsers();
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

exports.getUser = (req, res, next) => {
  try {
    const user = userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = (req, res, next) => {
  try {
    const user = userService.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = (req, res, next) => {
  try {
    const success = userService.deleteUser(req.params.id);
    if (!success) return res.status(404).json({ message: 'User not found' });

    res.json({ success: true, message: 'User deleted' });
  } catch (err) {
    next(err);
  }
};
