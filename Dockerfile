FROM node:18-alpine

WORKDIR /

COPY package.json package-lock.json /

RUN npm install --frozen-lockfile

COPY . /

EXPOSE 3000

ENV PORT=3000

CMD ["npm", "start"]