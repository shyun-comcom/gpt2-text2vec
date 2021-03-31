FROM node:10

WORKDIR /workspace

COPY package.json ./
RUN yarn
RUN yarn global add serve

COPY . .
RUN yarn build

EXPOSE 5000
CMD ["serve", "-s", "build"]