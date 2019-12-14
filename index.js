'use strict';

const Redis = require('./lib/cache/Redis');
const redisClient = new Redis({host: '127.0.0.1', port: '6379'});
var aa = redisClient.get('tt');


module.exports = {
    Helper: require('./lib/helper'),
    Jwt: require('./lib/auth/Jwt'),
    Aes: require('./lib/auth/Aes'),
    Logger: require('./lib/debug/Logger'),
    Redis: require('./lib/cache/Redis')
};
