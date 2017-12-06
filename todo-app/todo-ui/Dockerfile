#Based on the multi-stage build example by codefresh.io
#https://codefresh.io/blog/node_docker_multistage/

# ---- Base Node ----
FROM node:8.9.1-alpine AS base
# set working directory
WORKDIR /root/todo-app
# Set tini as entrypoint
ENTRYPOINT ["/sbin/tini", "--"]
# copy project file
COPY ./package.json .
COPY ./yarn.lock .
 
#
# ---- Dependencies ----
FROM base AS dependencies
# install yarn and dependencies
RUN npm i -g yarn@1.3.2 && yarn install

 
#
# ---- Test and Build----
# run linters, setup and tests
FROM dependencies AS build
COPY . .
RUN  CI=true yarn test && yarn build

#
# ---- Release ----
FROM nginx:1.13.7 AS release
WORKDIR /app
# copy production build output
COPY --from=build /root/todo-app/build .

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

STOPSIGNAL SIGTERM

# run nginx
CMD ["nginx", "-g", "daemon off;"]


