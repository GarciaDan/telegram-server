import pino from "pino";

export const Logger = pino({
  level: process.env["LOG_LEVEL"] || "info",
  base: { service: process.env["SERVICE_NAME"] || "telegram-server" },
  timestamp: pino.stdTimeFunctions.isoTime,
});