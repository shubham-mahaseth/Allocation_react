FROM node:alpine

WORKDIR /Allocation_react
COPY package.json ./
rm -rf node_modules
Run npm install -g npm@8.15.0
Run set NODE_OPTIONS=--max_old_space_size=4096
COPY . ./
EXPOSE 3000
CMD ["npm","start"]
