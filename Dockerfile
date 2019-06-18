FROM node:10
# Create app directory
WORKDIR /usr/src/app

#Install app dependencies
COPY package*.json ./

# RUN npm install for non-production
RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "start"]
