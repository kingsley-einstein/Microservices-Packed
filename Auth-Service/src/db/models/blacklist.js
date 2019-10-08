export default (sequelize, DataTypes) => {
  const Blacklist = sequelize.define('Blacklist', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Token is required'
        }
      }
    }
  });

  Blacklist.findByToken = (token) => Blacklist.findOne({
    where: {
      token
    }
  });

  return Blacklist;
};
