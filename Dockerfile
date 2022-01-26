FROM node:16-alpine

EXPOSE 4004

COPY package*.json /usr/app

FROM base as dev
ENV NODE_ENV=dev
RUN npm install
COPY . /usr/app

CMD ["nodemon", "bin/www"]