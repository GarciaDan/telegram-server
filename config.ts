const configuration = {
  baseUrl: "https://api.telegram.org",
  endpoints: {
    bot: "bot",
    sendPhoto: "sendPhoto",
    sendAudio: "sendAudio",
    sendVideo: "sendVideo",
    sendDocument: "sendDocument",
  },
  routes: {
    sendMessage: "sendmessage",
  },
  fileExtensions: {
    photo: ["jpg", "jpeg", "gif", "png", "bmp"],
    audio: ["mp3", "wav"],
    video: ["mp4", "mov", "avi"],
  },
  fileTypes: {
    photo: "photo",
    audio: "audio",
    video: "video",
    document: "document",
  },
};

export default configuration;
