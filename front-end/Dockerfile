FROM node:10-alpine

# install simple http server for serving static content
# RUN npm install -g http-server

# make the 'front-end' folder the current working directory
WORKDIR /front-end

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json /front-end/

# install project dependencies
RUN yarn

# copy project files and folders to the current working directory (i.e. 'front-end' folder)
COPY . /front-end/

# build client for production with minification
RUN yarn build

EXPOSE 3000
# CMD [ "http-server", "dist" ]
CMD ["yarn", "start"]