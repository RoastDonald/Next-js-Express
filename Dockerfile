FROM node:latest
RUN npm i -g netcat nc nodemon
WORKDIR /home/app
COPY ./wait-for.sh .

COPY ./package.json .
COPY ./packages/server/package.json ./packages/server/
COPY ./packages/common/package.json ./packages/common/

COPY ./packages/server/ ./packages/server/
COPY ./packages/common/ ./packages/common/

RUN npm install 
RUN ls

EXPOSE 8080
CMD [ "npm","run","server" ]