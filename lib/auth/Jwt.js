const jwt = require('jsonwebtoken');
const ToolsError = require('../errors');

class Jwt {
    constructor(secret) {
        this.secret = secret;
    }

    /**
     * Generate encrypted token
     * @param params Parameters to be encrypted
     * @param expires The period of validity
     * @returns {BaseError|*}
     */
    createToken(params, expires) {
        try {
            return jwt.sign(params, this.secret, {
                expiresIn: expires
            });
        } catch (e) {
            return new ToolsError.BaseError(e);
        }
    }

    /**
     * Decrypt the token
     * @param token
     * @returns {BaseError|*|Promise<unknown>}
     */
    verifyToken(token) {
        try {
            return new Promise((resolve, reject) => {
                jwt.verify(token, this.secret, (err, decoded) => {
                    if (err) {
                        reject(new ToolsError.BaseError(err.message));
                    }
                    resolve({code: 0, decoded: decoded});
                })
            })
        } catch (e) {
            return new ToolsError.BaseError(e);
        }
    }
}

module.exports = Jwt;
