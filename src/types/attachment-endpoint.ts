export type AttachmentEndpoint = {
  attachmentType: "photo" | "audio" | "video" | "document";
  endpoint: "/sendPhoto" | "/sendAudio" | "/sendVideo" | "/sendDocument";
};
