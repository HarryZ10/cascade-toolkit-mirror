FROM node:16
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY ./client .

EXPOSE 8080

CMD [ "npm", "run", "serve" ]
