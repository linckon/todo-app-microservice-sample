# starting from node base image
FROM node:14-alpine

# chaging the working directory
WORKDIR /app

# copying package files and installing dependecies
COPY package*.json ./

RUN npm install

# copying rest of the files
COPY . .

# starting the server
CMD [ "node", "index.js" ]