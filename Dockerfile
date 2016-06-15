FROM node:wheezy

ADD package.json /app

RUN npm install --production

CMD ["npm", "start"]
