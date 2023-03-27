import User from '../models/User.js'
import {BadRequestError, UnauthenticatedError} from "../errors/index.js";

const register = async (req, res, next) => {
    try {
        const {name, lastName, email, password, location} = req.body
        if (!name || !lastName || !email || !password) throw new BadRequestError("Please fill in all required fields")
        const userExists = await User.findOne({email})
        if (userExists) throw new BadRequestError("User already exists, try log in!")
        const user = await User.create({name, lastName, email, password, location})
        const token = user.createJWT()
        user.password = undefined
        res.status(201).json({
            user: {
                email: user.email,
                name: user.name,
                lastName: user.lastName,
                location: user.location,
            },
            token,
            userLocation: user.location})
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        console.log(req.body)
        const {email, password} = req.body
        if (!email || !password) {
            throw new BadRequestError('Please provide all values')
        }
        const user = await User.findOne({email}).select('+password')
        if (!user) throw new UnauthenticatedError('Invalid credentials, please try again!')

        const isPasswordCorrect = await user.comparePassword(password);
        if(!isPasswordCorrect) throw new UnauthenticatedError('Invalid credentials, please try again')
        const token = user.createJWT()
        user.password = undefined
        res.status(200).json({
            user: {
                email: user.email,
                name: user.name,
                lastName: user.lastName,
                location: user.location,
            },
            token,
            userLocation: user.location
        })
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const {email, name, lastName, location} = req.body
        console.log(req.body)
        if (!name || !lastName || !email || !location) throw new BadRequestError("Please fill in all required fields")
        const user = await User.findOne({_id: req.user.userId})

        user.email = email
        user.name = name
        user.lastName = lastName
        user.location = location

        await user.save()

        const token = user.createJWT()
        res.status(200).json({
            user: {
                email: user.email,
                name: user.name,
                lastName: user.lastName,
                location: user.location,
            },
            token,
            userLocation: user.location})
    } catch (error) {
        next(error)
    }
}

export {register, login, updateUser}