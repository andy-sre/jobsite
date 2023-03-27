import {UnauthenticatedError} from "../errors/index.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer')) throw new UnauthenticatedError('Authentication Invalid', 401)
        const token = authHeader.split(" ")[1]
        try {
            req.user = jwt.verify(token, process.env.JWT_SECRET)
            next()
        } catch (error) {
            throw new UnauthenticatedError('Authentication Invalid', 401)
        }
    } catch (error) {
        next(error)
    }

}

export default auth