module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        'role',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            timestamps: true,
            underscored: false,
            indexes: [
                {
                    unique: true,
                    fields: ['name']
                }
            ]
        }
    )