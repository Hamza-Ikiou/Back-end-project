const prisma = require("../prisma")
const {isValidEmail, hashPassword} = require('./utils')

const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.users.findMany()
        return res.json({ data: users })
    } catch(e) {
        return res.status(500).json({error: e.message})
    }
}

const getUser = async (req, res) => {
    try {
        const {email} = req.params
        const user = await prisma.users.findUnique({
            select: {
                id: true,
                email: true,
                role: true
            },
            where: {
                email: email
            }
        })
        return res.json({ data: user })
    } catch(error) {
        return res.status(500).json({error: error.message})
    }
}

const getUserForLogin = async (mail) =>  {
    return prisma.users.findUnique({
        select: {
            id: true,
            email: true,
            password: true,
            role: true
        },
        where: {
            email: mail
        }
    })
}

const createUser = async (req, res) => {
    try {
        const {email, password, role} = req.body
        if(!isValidEmail(email)) throw new Error("Invalid Email.")
        const hashedPassword = await hashPassword(password)
        const data = { email, password: hashedPassword, role }
        const user = await prisma.users.create({ data })
        return res.json({ data: user })

    } catch(error) {
        return res.status(500).json({error: error.message})
    }
}

const createUserForRegistration = async (req, res) => {
    try {
        const {email, password} = req.body
        if(!isValidEmail(email)) throw new Error("Invalid Email.")
        const hashedPassword = await hashPassword(password)
        const data = { email, password: hashedPassword }
        const user = await prisma.users.create({ data })
        return res.json({ data: user })

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const editUser = async (req, res) => {
    try {
        const {email} = req.params
        const {email: newEmail, password} = req.body
        let hashedPassword;
        if(password) hashedPassword = await hashPassword(password)

        const user = await prisma.users.update({
            where: {
                email: email
            },
            data: {
                ...(email ? {email: newEmail}: {}),
                ...(password ? {password: hashedPassword}: {})
            }
        })
        return res.json({ data: user })
    } catch(error) {
        return res.status(500).json({error: error.message})
    }
}

const deleteUser = async (req, res) => {
    try {
        const {email} = req.params
        const user = await prisma.users.delete({
            where: {
                email
            }
        })
        return res.json({ data: user })
    } catch(error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = {
    getAllUsers,
    getUser,
    getUserForLogin,
    createUser,
    createUserForRegistration,
    editUser,
    deleteUser
}