module.exports = {
    seed(models, callback) {

        const firms = [
            {
                id: 1,
                name: 'MindBehind',
            }
        ]

        const branches = [
            {
                id: 1,
                name: 'branch1',
                latitude: "",
                longitude: "",
                full_address: ""
            },
            {
                id: 2,
                name: 'branch2',
                latitude: "",
                longitude: "",
                full_address: ""
            },
            {
                id: 3,
                name: 'branch3',
                latitude: "",
                longitude: "",
                full_address: ""
            }
        ]

        const roles = [
            {
                id: 1,
                name: 'owner',
            },
            {
                id: 2,
                name: 'employee',
            }
        ]

        const users = [
            {
                id: 1,
                firmId: 1,
                username: 'admin',
                firstname: 'Admin',
                lastname: '.',
            },
            {
                id: 2,
                firmId: 1,
                username: 'employee1',
                firstname: 'employee1',
                lastname: '.',
            },
            {
                id: 3,
                firmId: 1,
                username: 'employee2',
                firstname: 'employee1',
                lastname: '.'
            }
        ]

        const userRoles = [
            {
                userId: 1,
                roleId: 1,
            },
            {
                userId: 2,
                roleId: 2,
            },
            {
                userId: 3,
                roleId: 2,
            }
        ]

        models.firm.bulkCreate(firms, { ignoreDuplicates: true })
        models.role.bulkCreate(roles, { ignoreDuplicates: true })
        models.user.bulkCreate(users, { ignoreDuplicates: true })
        models.userRole.bulkCreate(userRoles, { ignoreDuplicates: true })
        models.branch.bulkCreate(branches, { ignoreDuplicates: true });

        if (callback) callback()
    },
}
