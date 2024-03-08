FROM node:21

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install -g npm@10.2.0

RUN npm install

# Bundle app source
COPY ./routes /app/routes/
COPY app.js .
COPY credentials.js .

EXPOSE 3001

CMD [ "node", "app.js" ]
