# Simple Telegram Server

The following express server exposes a simple endpoint to be used as notification service for pw-educamos-notifier.

The service exposes the endpoint `POST /sendmessage`, expecting the following body:

```typescript
{
    message: string,
    format?: "HTML" | "MarkdownV2" | "Markdown",
    attachments?: [
        {
            "fileName": string;
            "fileBase64Content": string;
        }
    ]
}
```

The `message` field should contain the message text using `HTML` styling by default. You can change this behaviour using the `format` field.

The message can provide attachments. To do so, filename and its content in Base64 format should be provided. All the attachments will be sent sequentially after the text message.

## Prerequisites

You need to provide a Telegram bot key and a Chat ID in order to be able to send messages.

If you don't know how to create a Telegram bot and generate that information, check [this link](https://core.telegram.org/bots#how-do-i-create-a-bot). I assure you it's quite simple (and also for free).

## Environment variables

In order to make it work, you need to create an `.env` file with the following variables:
- `TELEGRAM_TOKEN`: Your Telegram API token
- `TELEGRAM_CHAT_ID`: ChatID where the message will be sent

## Running the application

### Standalone

You can run the application by installing dependencies and running the following:

```bash
npm install
npm run tsstart
```

### Docker image

Alternately, you can use a docker image for the same purpose using docker compose:

```
docker-compose up
```

