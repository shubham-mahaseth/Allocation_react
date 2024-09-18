FROM node:alpine

WORKDIR /Allocation_react
COPY package.json ./
Run npm install -g npm@8.15.0
Run npm rebuild node-sass
Run npm run build
Run set NODE_OPTIONS=--max_old_space_size=4096
COPY . ./
EXPOSE 3000
CMD ["npm","start","0.0.0.0:3000"]
