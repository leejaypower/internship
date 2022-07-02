const WinstonDaily = require('winston-daily-rotate-file');
const winston = require('winston');

const {
  combine, timestamp, printf, prettyPrint,
} = winston.format;

// log format 정의
const logFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  printf((info) => {
    if (info instanceof Error) {
      const stack = info.extensions?.exception?.stacktrace || info?.stack || 'stacktrace';
      const statusCode = info?.extensions?.statusCode || info?.statusCode || 'statusCode';
      const name = info?.extensions?.exception?.name || info?.name;

      let stackTrace;
      if (Array.isArray(stack)) {
        stackTrace = stack.map((el) => el.split(',')).join('\n');
      } else {
        stackTrace = stack;
      }

      return `Timestamp : ${info.timestamp}, Level : ${info.level}, statusCode : ${statusCode} 
      \n Name : ${name}, Message : ${info.message} 
      \n Error Stack: ${stackTrace}`;
    }

    return `${info.timestamp} ${info.level}: ${info.message}`;
  }),
);

// logs 디렉토리 하위에 로그 파일 저장 path : koa-books/logs
const logDir = `${process.cwd()}/logs`;

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */

const winstonFormatByError = {
  info: {
    level: 'info',
    datePattern: 'YYYY-MM-DD HH24:MI:SS',
    dirname: `${logDir}/combined`,
    filename: 'combined.log',
    maxFiles: 30, // 30일치 로그 파일 저장
    zippedArchive: true, // 날짜가 지나면 자동으로 압축
  },
  error: {
    level: 'error',
    datePattern: 'YYYY-MM-DD HH24:MI:SS',
    dirname: `${logDir}/errors`,
    filename: 'error.log',
    maxFiles: 30, // 30일치 로그 파일 저장
    zippedArchive: true, // 날짜가 지나면 자동으로 압축
  },

};

const logger = winston.createLogger({
  level: 'debug', // 최소 레벨
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    prettyPrint(),
    logFormat,
  ),
  transports: [
    new WinstonDaily(winstonFormatByError.info),
    new WinstonDaily(winstonFormatByError.error),
  ],
});

/**
 *  production이 아닌 경우
 * ${info.level}: ${info.message} JSON.stringify({ ...rest }) `
 */

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ),
  }));
}

module.exports = { logger };
