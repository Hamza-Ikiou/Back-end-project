const prisma = require("../prisma")
const bcrypt = require('bcryptjs')

const getAllUsers = async (req, res) => {}

const getUser = async (req, res) => {}

const getUserForLogin = async (mail) =>  {}

const createUser = async (req, res) => {
    try {
        const email = req.body.email
        const password = bcrypt.hashSync(req.body.password, 8)
        const role = req.body.role

        const data = { email, password, role }
        const user = await prisma.users.create({ data })
        return res.json({ data: user })

    } catch(error) {
        return res.status(500).json({error: error.message})
    }
}

const editUser = async (req, res) => {
    try {
        const email = req.params.email

        const newEmail = req.body.email
        const password = bcrypt.hashSync(req.body.password, 8)

        const user = await prisma.users.update({
            where: {
                email: email
            },
            data: {
                email: newEmail,
                password: password
            }
        })
        return res.json({ data: user })
    } catch(error) {
        return res.status(500).json({error: error.message})
    }
}

const deleteUser = async (req, res) => {}

module.exports = {
    getAllUsers,
    getUser,
    getUserForLogin,
    createUser,
    editUser,
    deleteUser
}