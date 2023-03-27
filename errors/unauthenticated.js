import CustomAPIError from "./custom-api.js";

class UnauthenticatedError extends CustomAPIError {
    constructor(props, code) {
        super(props);
        this.statusCode = code | 400
    }
}

export default UnauthenticatedError