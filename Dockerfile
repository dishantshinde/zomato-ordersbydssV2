FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application
COPY . .

# Expose port
EXPOSE 8080

# Environment variables
ENV DB_HOST=sql12.freesqldatabase.com
ENV DB_USER=sql12718705
ENV DB_PASSWORD=8MFAzMFNwi
ENV DB_NAME=sql12718705

# Start the application
CMD ["npm", "start"]
