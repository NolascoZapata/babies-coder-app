const {transports} = require('winston')
const winston = require('winston')

const logger = winston.createLogger({
    level: 'warn',
    transports: [
        new winston.transports.Console({
            level: 'info', //muestra desde este nivel 
        }),
        new winston.transports.File({// a este nivel genera el archivo de warn.log
            level: 'warn', 
            filename: './log/warn.log',
        }),
        new winston.transports.Console({ 
            level: "error"
        }),
        new winston.transports.File({// a este nivel genera el archivo de error.log
            level: 'error', 
            filename: './log/error.log',
        }),
    ],
    format: winston.format.combine(
        winston.format.colorize({all:true}),
        winston.format.align(),
        winston.format.printf((info) => `[${info.level}] | ${info.message}` )
    )
})

module.exports = {
    logger
}