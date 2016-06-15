FROM node:wheezy

# Build
RUN mkdir -p /app
ADD package.json /app
WORKDIR /app
RUN npm install --production

# Copy files
ADD . /app

# Start
CMD ["npm", "start"]
