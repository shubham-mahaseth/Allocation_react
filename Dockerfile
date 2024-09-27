FROM node:18.15.0-alpine

WORKDIR /app
COPY package.json ./
RUN npm install -f
RUN npm install crypto-js -f
Run set NODE_OPTIONS=--max_old_space_size=4096
COPY . .
EXPOSE 3000
CMD ["npm","start","0.0.0.0:3000"]
