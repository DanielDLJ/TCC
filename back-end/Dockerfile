FROM node:10-alpine


WORKDIR /app
COPY package*.json /app/

RUN yarn

COPY . /app/


EXPOSE 3001
CMD ["yarn", "start"]