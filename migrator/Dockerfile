FROM node:21

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package-lock.json .
COPY package.json .
RUN npm install

# Bundle app source
COPY ./config /app/config/
COPY ./migrations /app/migrations
COPY ./models /app/models
COPY ./seeders /app/seeders

CMD ["npm", "run", "migrate"]
