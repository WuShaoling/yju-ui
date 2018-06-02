FROM node as builder

RUN npm install -g gulp bower

WORKDIR /app

COPY bower.json package.json /app/

RUN rm -rf /node_modules && npm install && bower install --allow-root

COPY . /app/

RUN gulp env:config && gulp clean && gulp build


FROM nginx:latest

EXPOSE 80

COPY --from=builder /app/dist/* /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
