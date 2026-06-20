FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
RUN apk add --no-cache bash && chmod +x entrypoint.sh
EXPOSE 3000
CMD ["sh", "entrypoint.sh"]
