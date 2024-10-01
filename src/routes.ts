// routes.ts
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import TelegramWorker from "./workers/telegram-worker";

dotenv.config();

const BOT_TOKEN = process.env["TELEGRAM_TOKEN"];
const CHAT_ID = process.env["TELEGRAM_CHAT_ID"];

const router = express.Router();
const worker = new TelegramWorker(BOT_TOKEN, CHAT_ID);

router.get("/", (req: Request, res: Response) => {
  const help = "/sendmessage { \"message\": \"text\" }<br>/sendfiles [\"filepath1.xxx\", \"filepath2.xxx\"]<br>";
  res.send(help);
});

router.post(
  "/sendmessage",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body.message;
      const response = await worker.sendMessage(body);
      res.send(JSON.stringify(response));
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/sendfiles",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const attachments = req.body;
      const response = [];
      if (attachments && attachments?.length > 0) {
        for (const attachment of attachments) {
          try {
            const msgResponseAttachment = await worker.sendAttachment(
              attachment
            );
            response.push(msgResponseAttachment.data);
          } catch (error) {
            console.error("Error sending attachment: " + error);
          }
        }
      }
      res.send(JSON.stringify(response));
    } catch (error) {
      next(error);
    }
  }
);

export default router;
