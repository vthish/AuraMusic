# Use Node.js as the base image
FROM node:18-alpine

WORKDIR /app

# Install project dependencies
COPY package*.json ./
RUN npm install

# Install Expo CLI globally
RUN npm install -g expo-cli

COPY . .

# Expose the default Expo port
EXPOSE 8081

# Start the Expo development server
CMD ["npx", "expo", "start"]