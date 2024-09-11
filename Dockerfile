FROM node:alpine

WORKDIR /Allocation_react
COPY package.json .
RUN npm install -g npm@8.15.0
RUN npm rebuild node-sass
RUN npm run build
Run set NODE_OPTIONS=--max_old_space_size=4096
COPY . .
EXPOSE 3000
CMD ["npm","start","0.0.0.0:3000"]