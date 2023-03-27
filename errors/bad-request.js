import CustomAPIError from "./custom-api.js";

class BadRequestError extends CustomAPIError {
    constructor(props) {
        super(props);
        this.statusCode = 400
    }
}

export default BadRequestError