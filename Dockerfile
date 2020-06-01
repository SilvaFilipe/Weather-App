#build stage
FROM node:13.14.0-alpine3.10 as build-stage

#create destination directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#update and install dependencies
COPY . /usr/src/app
RUN npm install

RUN cd client
RUN npm install

#RUN npm run build

EXPOSE 5000
#ENV NUXT_HOST=0.0.0.0
#ENV NUXT_PORT=3000

CMD ["npm","run","dev"]