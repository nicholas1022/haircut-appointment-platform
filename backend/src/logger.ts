import winston, { format } from 'winston';

// Define your custom logger
const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  defaultMeta: { service: 'to-do-app' },
  transports: [
    new winston.transports.Console()
  ],
});

export default logger;
