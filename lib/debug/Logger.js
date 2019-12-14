'use strict';

const log4js = require('log4js');

/**
 * 使用教程
    const Logger  = require('./lib/debug/Logger');
    const myDate = new Date();
    let file = myDate.getFullYear() + '-' + parseInt(myDate.getMonth() + 1) + '-' + myDate.getDate() + '.log';
    let config = {
        categories: "log_file",
        appenders: {
            type: "dateFile",
            filename: file,
        },
        level: "debug"
    };
    const logger = new Logger(config);
    logger.debug('this is debug info');
 */

class Logger {
    constructor(config) {
        log4js.configure({
            appenders: {
                [config.categories]: config.appenders
            },
            categories: {
                default: {appenders: [config.categories], level: config.level}
            }
        });
        this.logger = log4js.getLogger(config.categories);
    }

    /**
     * 输出info类别的日志
     * @param message
     */
    info(message) {
        this.logger.info(message);
    }

    /**
     * 输出debug类别的日志
     * @param message
     */
    debug(message) {
        this.logger.debug(message);
    }

    /**
     * 输出警告类别的日志
     * @param message
     */
    warn(message) {
        this.logger.warn(message);
    }

    /**
     * 输出错误类别的日志
     * @param message
     */
    error(message) {
        this.logger.error(message);
    }
}

module.exports = Logger;
