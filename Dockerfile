FROM node:slim

ADD . /app/
RUN cd /app && npm install

WORKDIR /app/

ENTRYPOINT ["node", "."]
