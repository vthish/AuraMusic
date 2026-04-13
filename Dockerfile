FROM node:20-slim
WORKDIR /app

# Install dependencies and Ngrok
RUN apt-get update && apt-get install -y curl gnupg ca-certificates \
    && curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | gpg --dearmor -o /etc/apt/keyrings/ngrok.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/ngrok.gpg] https://ngrok-agent.s3.amazonaws.com buster main" | tee /etc/apt/sources.list.d/ngrok.list \
    && apt-get update && apt-get install ngrok -y \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install
RUN npm install -g @expo/ngrok

COPY . .

# Environment Variables
ENV AUTHTOKEN=3CIQI6ZD69GLSt5veG2Nk0MfgZr_6D8ruaVpsU1QsNwK68RRJ
EXPOSE 8081

# Fix: Set Auth token AND force 'ap' (Asia/Pacific) region for stability
ENTRYPOINT ["sh", "-c", "ngrok config add-authtoken $AUTHTOKEN && printf \"region: ap\n\" >> /root/.config/ngrok/ngrok.yml && npx expo start --tunnel"]