const { DataTypes } = require('sequelize');
const { sequelize } = require('@config/sequelize');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  // Define model attributes
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  // Add more attributes as needed
});

// Before saving a user, hash the password
User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

// verify password
User.prototype.comparePassword = async function (yourPassword) {
  return await bcrypt.compare(yourPassword, this.password);
};

// Create the table if it doesn't exist
// User.sync({ alter: true });

// Export the User model
module.exports = User;
