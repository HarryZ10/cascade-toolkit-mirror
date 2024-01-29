FROM node:16

# Create app directory
WORKDIR /app

# Install app dependencies
COPY migrator/package*.json ./
RUN npm install

# Bundle app source
COPY migrator/. .

CMD ["npm", "run", "migrate"]
