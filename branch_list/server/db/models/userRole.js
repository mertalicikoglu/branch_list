module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        'userRole',
        {
        },
        {
            timestamps: true,
            underscored: false,
        }
    )