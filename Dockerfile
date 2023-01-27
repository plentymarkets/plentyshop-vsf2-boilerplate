# Dockerfile
FROM node:14.21-alpine3.17

WORKDIR /app

RUN apk add dumb-init

# create destination directory

EXPOSE 80

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=80

# copy the app, note .dockerignore
COPY . /app

RUN yarn install
RUN yarn build

# Copy your code in the docker image
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["yarn", "start"]
