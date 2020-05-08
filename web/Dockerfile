FROM node:12.2.0-alpine as react_build
#also say
WORKDIR /usr/src/app/web
#copy the react app to the container
COPY . /usr/src/app/web/

# #prepare the contiainer for building react
RUN npm install --silent
RUN npm install react-app-rewired@2.1.5 -g --silent
RUN npm run build

#prepare nginx
FROM nginx:1.16.0-alpine

COPY --from=react_build /usr/src/app/web/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d



#fire up nginx
EXPOSE 8080
CMD ["nginx","-g","daemon off;"]

