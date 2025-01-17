FROM node:18-alpine
WORKDIR /app
COPY tests/package.json .
COPY tests/package-lock.json .
RUN npm install
COPY tests/index.test.js .
CMD ["npm", "test"]