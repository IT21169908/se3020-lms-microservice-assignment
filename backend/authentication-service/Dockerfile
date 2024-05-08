# Use Node.js base image
FROM node

# Set working directory
WORKDIR /app/authentication-service

# Copy package.json and package-lock.json
COPY package.json .

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose the port
EXPOSE 8001

# Command to run the service
CMD ["npm", "start"]
