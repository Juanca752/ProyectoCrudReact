FROM node:22.7.0-slim
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

#only in prod
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
#CMD ["npm", "run", "start:dev"]
