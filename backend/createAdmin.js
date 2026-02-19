import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import userModel from "./models/user.Model.js";
import 'dotenv/config';

const createAdmin = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URI)

        const adminEmail = 'sartaj9806@gmail.com';

        // check if admin already exists
        const existingAdmin = await userModel.findOne({email : adminEmail})
        if(existingAdmin) {
            console.log('Admin already exists')
            process.exit(1)
        }

        const hashPassword = await bcrypt.hash('12345678', 10)

        await userModel.create({
            name : 'Sartaj Alam',
            email : adminEmail,
            password : hashPassword, 
            role : 'ADMIN'
        })

        console.log('Admin created successfully')
        process.exit(0)
        
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}


createAdmin()