FROM node:16

# Create app directory
WORKDIR /app

# Install app dependencies
COPY ./server/package*.json ./

RUN npm install

# Bundle app source
COPY ./server .

EXPOSE 3001

CMD [ "node", "index.js" ]
