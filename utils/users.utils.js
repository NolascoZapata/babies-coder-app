const formatUserForDB = (userObj) => {
  const newUser = {
    name:userObj.name,
    email: userObj.email,
    password: userObj.password,
    isAdmin: userObj.isAdmin,
    userAvatar: userObj.userAvatar,
    createdAt: new Date(),
    updatedAt: new Date(),
    accounts: null,
    cart:null,
    orders:null
  };
  return newUser;
};

module.exports = {
  formatUserForDB,
}