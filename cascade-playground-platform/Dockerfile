FROM node:21

# Install Vue CLI globally
RUN npm install -g @vue/cli-service

WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install
RUN npm install --save-dev

# Bundle app source
COPY ./public /app/public
COPY ./src /app/src
COPY babel.config.js .
COPY jsconfig.json .
COPY vue.config.js . 

EXPOSE 8080

CMD [ "npm", "run", "serve" ]
