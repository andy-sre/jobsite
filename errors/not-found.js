import CustomAPIError from "./custom-api.js";

export class NotFoundError extends CustomAPIError {
    constructor(props) {
        super(props);
        this.statusCode = 404
    }
}

export default NotFoundError