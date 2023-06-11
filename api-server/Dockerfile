# starting from node base image
FROM node:14-alpine

# chaging the working directory
WORKDIR /app

# copying package files and installing dependecies
COPY package*.json ./

RUN npm install

# copying rest of the files
COPY . .

# Expose the port on which your Express.js application is running
EXPOSE 5001

# starting the server
CMD [ "node", "index.js" ]