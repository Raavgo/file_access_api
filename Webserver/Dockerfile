FROM node:16

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


COPY . /usr/src/app
RUN npm install
EXPOSE 8000

CMD ["node", "webserver.js"]