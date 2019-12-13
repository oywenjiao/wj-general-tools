'use strict';

class BaseError extends Error{
    constructor(message) {
        super(message);
        this.name = 'ToolsBaseError';
        this.status = 401;
        this.err_msg = message;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = BaseError;
