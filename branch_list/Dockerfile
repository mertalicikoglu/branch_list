FROM node:14

WORKDIR /branch_list
COPY package.json .
RUN npm install
COPY . .
CMD npm start