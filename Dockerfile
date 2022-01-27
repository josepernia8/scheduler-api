FROM node:16-alpine

ENV NODE_ENV=development
WORKDIR /usr/app

COPY package*.json /usr/app
RUN npm install

COPY . /usr/app

CMD ["nodemon", "bin/www"]