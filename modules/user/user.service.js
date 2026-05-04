let users = [];
let id = 1;

exports.createUser = (data) => {
  const newUser = { id: id++, ...data };
  users.push(newUser);
  return newUser;
};

exports.getUsers = () => users;

exports.getUserById = (userId) =>
  users.find(u => u.id === Number(userId));

exports.updateUser = (userId, data) => {
  const index = users.findIndex(u => u.id === Number(userId));
  if (index === -1) return null;

  users[index] = { ...users[index], ...data };
  return users[index];
};

exports.deleteUser = (userId) => {
  const index = users.findIndex(u => u.id === Number(userId));
  if (index === -1) return false;

  users.splice(index, 1);
  return true;
};
