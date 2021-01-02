FROM node:latest
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

WORKDIR /srv/api/

ENV NODE_ENV development

COPY package*.json ./
COPY . ./
RUN apt-get update

RUN npm install -g nodemon
RUN npm install

ARG port=3000
EXPOSE $port

CMD /wait && nodemon --exec babel-node index.js