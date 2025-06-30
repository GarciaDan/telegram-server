import express, { Request, Response } from "express";
import dotenv from "dotenv";
import TelegramSimpleClient from "./services/telegram-simple-client";
import { Attachment } from "./types/attachment";
import { Logger } from "./utils/logger";

dotenv.config();

const BOT_TOKEN = process.env["TELEGRAM_TOKEN"];
const CHAT_ID = process.env["TELEGRAM_CHAT_ID"];

const router = express.Router();
const telegramClient = new TelegramSimpleClient(BOT_TOKEN, CHAT_ID);

router.get("/health", (req: Request, res: Response) => {
  res.send(JSON.stringify({ status: "ok" }));
});

router.post("/sendmessage", async (req: Request, res: Response) => {
  try {
    const message: string = req.body.message;
    const attachments: Array<Attachment> = req.body.attachments ?? [];
    const format: "HTML" | "MarkdownV2" | "Markdown" =
      req.body.format ?? "HTML";

    Logger.info(
      `Sending message with ${attachments.length} attachments: ${message}`
    );
    const response = await telegramClient.sendMessage(
      message,
      attachments,
      format
    );
    res.send(JSON.stringify(response));
  } catch (err) {
    Logger.error(err, "Error sending message to Telegram");
  }
});

export default router;
