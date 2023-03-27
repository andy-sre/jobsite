import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: [true, 'Please provide your last name'],
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: [true, 'Please provide a email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        },
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
        select: false
    },
    location: {
        type: String,
        trim: true,
        maxlength: 20
    },});

UserSchema.pre('save', async function() {
    if (!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.model('User', UserSchema);