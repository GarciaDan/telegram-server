FROM node:22-slim AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY src/ ./src
COPY app.ts ./
COPY config.ts ./
COPY tsconfig.json ./
RUN npm run build

# ---------------------------------------------------- #

FROM node:22-slim AS base

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
RUN apt-get update && apt-get install curl -y
CMD ["node","dist/app.js"]
