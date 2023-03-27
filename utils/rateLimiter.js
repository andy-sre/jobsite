// rate-limiter.js
import rateLimiter from "express-rate-limit";

const limiter = rateLimiter({
    windowMS: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMS
    message: "You can't make any more requests at the moment. Try again later",
    handler: (req, res, next) => {
        res.status(429).json({ msg: "You can't make any more requests at the moment. Try again later" });
    }
});

export default limiter;