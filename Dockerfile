FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install ci
RUN npm run build

FROM alpine
RUN apk add --update nodejs npm
WORKDIR /app
COPY package*.json ./
RUN npm install ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
CMD ["npm", "run", "start:migrate:prod"]
EXPOSE 4000

# FROM node:18-alpine
# WORKDIR /app
# COPY . .
# RUN npm install
# COPY package*.json ./
# CMD ["npm", "run", "start:dev"]
# EXPOSE 4000