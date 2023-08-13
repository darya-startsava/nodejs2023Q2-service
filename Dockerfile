FROM alpine
RUN apk add --update nodejs npm
WORKDIR /app
COPY . .
RUN npm install
COPY package*.json ./
CMD ["npm", "run", "start:migrate:dev"]
EXPOSE 4000