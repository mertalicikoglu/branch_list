module.exports = {
    associate: (models) => {
      models.branch.belongsTo(models.user, { foreignKey: 'branchId', as: 'branch' })
      models.user.hasMany(models.branch)
      models.firm.hasMany(models.role)
      models.firm.hasMany(models.user)
      models.role.belongsTo(models.firm)
      models.user.belongsTo(models.firm)
      models.user.belongsToMany(models.role, {
        through: models.userRole,
        as: 'roles',
      })
      models.role.belongsToMany(models.user, {
        through: models.userRole,
        as: 'users',
      })
    },
  }
  