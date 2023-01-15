FROM node:16

WORKDIR /srv/app/

COPY /seed/ /srv/app/.

RUN npm install -g npm@8.19.2

RUN npm install -g husky

RUN npm install

EXPOSE 8001

CMD ["node", "index.js"]
