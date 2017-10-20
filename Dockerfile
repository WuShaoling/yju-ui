FROM node as builder


RUN apt-key adv --keyserver pgp.mit.edu --recv-keys 573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62
RUN echo "deb http://nginx.org/packages/mainline/debian/ wheezy nginx" >> /etc/apt/sources.list

ENV NGINX_VERSION 1.7.12-1~wheezy

RUN apt-get update && \
    apt-get install -y ca-certificates nginx && \
    rm -rf /var/lib/apt/lists/*

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80

# RUN npm install -g gulp bower && \
#     npm install -g cnpm --registry=https://registry.npm.taobao.org

RUN npm install -g gulp bower

WORKDIR /app

COPY . /app/

# RUN rm -rf /node_modules && npm install && bower install --allow-root

RUN gulp clean && gulp build 



FROM nginx


EXPOSE 80

WORKDIR /app

COPY --from=builder /app/dist /app/dist

RUN cp -R /app/dist/*  /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"] 


# docker build -t <image-name> .
# docker run -p port:port1 -d <image-name>