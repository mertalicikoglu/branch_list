module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'branch',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      full_address: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
    },
    {
      timestamps: true,
      underscored: false,
    },
  )
