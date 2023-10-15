FROM node:18

WORKDIR /home/app

RUN rm -rf node_modules
COPY . .

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]