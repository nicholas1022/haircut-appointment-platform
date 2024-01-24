# Use the official Node.js 15 image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Bundle app source
COPY . .

# Build the TypeScript code and generate the production build using Vite
RUN npm run build

# Expose the port used by your Vite app
EXPOSE 4173

# Define the command to run your application in production mode
CMD ["npm", "run", "preview"]