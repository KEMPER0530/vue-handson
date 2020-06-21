FROM node:10.16.0-alpine

WORKDIR /app

RUN apk update && \
    apk add vim && \
    apk add git
RUN npm install -g npm
RUN yarn install && \
        yarn global add node-gyp && \
        yarn global add firebase && \
        yarn global add firebaseui && \
        yarn global add firebaseui-ja && \
        yarn global add http-server && \
        yarn global add moment && \
        yarn global add @vue/cli && \
        yarn global add vue2-google-maps && \
        yarn global add vue-loading-overlay

#ENV PATH $HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH
#ENV CHOKIDAR_USEPOLLING=true

RUN apk add tzdata
ENV TZ=Asia/Tokyo

# Expose default port (8080)
EXPOSE 8080
