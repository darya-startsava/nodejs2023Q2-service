FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
COPY package*.json ./
CMD ["npm", "run", "start:dev"]
EXPOSE 4000