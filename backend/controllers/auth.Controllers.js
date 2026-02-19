import userModel from "../models/user.Model.js";
import bcrypt from 'bcrypt'
import generateToken from "../utils/generateToken.js";
import bookingModel from "../models/booking.Model.js";


export const getMe = async (req, res) => {

    const userId = req.user.id;

    try {

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }

        return res.status(200).json({ success: true, user })

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to fetch user. Please try again later.' })
    }
}

export const login = async (req, res) => {

    console.log("Login")

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' })
    }

    if (!email.includes('@')) {
        return res.status(400).json({ success: false, message: 'Invalid email format' })
    }

    if (password.length < 8) {
        return res.status(400).json({ success: false, message: 'Password should be at 8 characters.' })
    }

    try {

        const user = await userModel.findOne({ email }).select("+password")

        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid Password' })
        }

        const token = generateToken({ id: user._id, role: user.role });

        user.password = undefined;

        return res.status(200).json({ success: true, message: 'Logged in successfully.', token, user })

    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ success: false, message: 'Failed to login. Please try again later.' })

    }

}

export const create = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ success: false, message: 'All fields are mandatory:' })
        }

        if (!email.includes('@')) {
            return res.status(400).json({ success: false, message: 'Please Enter correct email' })
        }

        const user = await userModel.findOne({ email })
        if (user) {
            return res.status(409).json({ success: false, message: 'User already exits' })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({
            name, email, password: hashPassword
        })

        const token = generateToken({ id: newUser._id, role: newUser.role });

        newUser.password = undefined

        return res.status(201).json({ success: true, message: 'Successfully Sign up', data: newUser, token })

    } catch (error) {
        console.error("Create user error : ", error)
        return res.status(500).json({ success: false, message: 'Failed to create new user' })
    }
}

export const update = async (req, res) => {
    try {

        const { userId } = req.params;

        const { password } = req.body;

        const hashPassword = await bcrypt.hash(password, 10)

        const updateUser = await userModel.findByIdAndUpdate(userId, {
            password: hashPassword
        })

        return res.status(201).json({ success: true, message: 'Successfully user update', updateUser })

    } catch (error) {
        console.log("Update user error : ", error)
        res.status(500).json({ success: false, message: 'Failed to update user' })
    }
}

export const getAllUser = async (req, res) => {
    try {

        const allUsers = await userModel.find()

        return res.status(200).json({ success: true, message: 'Successfully fetch users', data: allUsers })

    } catch (error) {
        console.error("Get All user error : ", error)
        res.status(500).json({ success: false, message: 'Failed to get all users' })
    }
}

export const deleteUser = async (req, res) => {
    try {

        const { userId } = req.params;

        await userModel.findByIdAndDelete(userId)

        const userBooking = await bookingModel.find({ userId: userId })

        for (const element of userBooking) {
            await bookingModel.findByIdAndDelete(element._id)
        }


    } catch (error) {
        console.error("Delete User error : ", error)
        return res.status(500).json({ success: false, message: 'Failed to delete user' })
    }
}