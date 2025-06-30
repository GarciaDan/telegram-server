import { TelegramMessage } from "../types/telegram-message";
import axios, { AxiosResponse } from "axios";
import FormData from "form-data";
import path from "path";
import { Attachment } from "../types/attachment";
import { AttachmentEndpoint } from "../types/attachment-endpoint";
import { TelegramFormat } from "../types/telegram-format";
import configuration from "../../config";

export default class TelegramSimpleClient {
  private chatId: string;
  private baseUrl: string;
  private apiUrl: string;

  constructor(botToken: string, chatId: string) {
    this.chatId = chatId;
    this.baseUrl = `${configuration.baseUrl}/${configuration.endpoints.bot}${botToken}`;
    this.apiUrl = `${this.baseUrl}/${configuration.routes.sendMessage}`;
  }

  async sendMessage(
    telegramMessage: string,
    attachments?: Attachment[],
    format: TelegramFormat = "HTML"
  ): Promise<any[]> {
    const response = [];

    try {
      // Send the text message
      const messageData: TelegramMessage = {
        chat_id: this.chatId,
        text: telegramMessage,
        parse_mode: format,
      };

      const msgResponse: AxiosResponse = await axios.post(
        this.apiUrl,
        messageData
      );
      response.push(msgResponse.data);

      // Send attachments if any
      if (attachments && attachments.length > 0) {
        for (const attachment of attachments) {
          try {
            const attachmentResponse = await this.sendBase64Attachment(
              attachment.fileName,
              attachment.fileBase64Content
            );
            response.push(attachmentResponse.data);
          } catch (error) {
            console.error("Error sending attachment:", error);
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

    return response;
  }

  async sendBase64Attachment(
    fileName: string,
    fileContentBase64: string
  ): Promise<AxiosResponse> {
    const content = Buffer.from(fileContentBase64, "base64");
    const formData = new FormData();
    formData.append("chat_id", this.chatId);

    const extension = path.extname(fileName).slice(1).toLowerCase();
    const { attachmentType, endpoint } =
      this.getAttachmentEndpointByExtension(extension);
    formData.append(attachmentType, content, fileName);
    const apiUrl = `${this.baseUrl}${endpoint}`;

    try {
      const response: AxiosResponse = await axios.post(apiUrl, formData, {
        headers: formData.getHeaders(),
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });
      return response;
    } catch (error) {
      console.error("Error sending attachment:", error);
      throw error;
    }
  }

  private getAttachmentEndpointByExtension(
    extension: string
  ): AttachmentEndpoint {
    const attachmenTypes = {};
    const endpoints = {};

    configuration.fileExtensions.photo.forEach((ext) => {
      attachmenTypes[ext] = configuration.fileTypes.photo;
      endpoints[ext] = `/${configuration.endpoints.sendPhoto}`;
    });
    configuration.fileExtensions.audio.forEach((ext) => {
      attachmenTypes[ext] = configuration.fileTypes.audio;
      endpoints[ext] = `/${configuration.endpoints.sendAudio}`;
    });
    configuration.fileExtensions.video.forEach((ext) => {
      attachmenTypes[ext] = configuration.fileTypes.video;
      endpoints[ext] = `/${configuration.endpoints.sendVideo}`;
    });

    const attachmentType =
      attachmenTypes[extension.toLocaleLowerCase()] ?? configuration.fileTypes.document;
    const endpoint =
      endpoints[extension.toLocaleLowerCase()] ?? `/${configuration.endpoints.sendDocument}`;;

    return {
      attachmentType: attachmentType,
      endpoint: endpoint,
    };
  }
}
