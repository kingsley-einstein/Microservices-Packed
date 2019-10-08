import bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Username cannot be empty'
        }
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        }
      }
    }
  }, {
    timestamps: true,
    hooks: {
      beforeSave: (user) => {
        if (user.changed('password')) {
          const salt = bcrypt.genSaltSync(19);
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    }
  });

  User.findByUsername = (username) => User.findOne({
    where: {
      username
    }
  });

  User.updateById = (id, update) => User.update(update, {
    where: {
      id
    },
    individualHooks: true
  });

  return User;
};
