FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install
# Expo tunnel details
RUN npm install -g @expo/ngrok

COPY . .

EXPOSE 8081
CMD ["npx", "expo", "start", "--tunnel"]