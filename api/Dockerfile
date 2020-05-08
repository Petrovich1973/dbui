FROM node
WORKDIR /usr/src/app/api
COPY package.json .
#RUN npm i nodemon -g && npm i
RUN npm i
COPY . .
EXPOSE 5000
CMD ["npm","run","starting"]
