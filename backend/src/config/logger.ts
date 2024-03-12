import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// Configuración de formatos para la consola y el archivo
const logFormat = format.combine(
  format.simple(),
  format.timestamp(),
  format.printf(
    (info) => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`
  )
);

// Configuración de los transportes (consola y archivo)
export const logger = createLogger({
  level: "info", // Nivel mínimo de los mensajes que se deben registrar
  format: logFormat,
  transports: [
    // Transporte para el archivo
    new DailyRotateFile({
      filename: "logs/app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m", 
      maxFiles: "7d", 
    }),
    // Transporte para la consola
    new transports.Console(),
  ],
});
