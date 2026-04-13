FROM node:20-alpine

WORKDIR /app

# Copy only package files first to leverage Docker cache
COPY package*.json ./

# Install local dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose the Metro Bundler port
EXPOSE 8081

# Directly run expo using npx (No global expo-cli needed)
CMD ["npx", "expo", "start", "--tunnel"]