FROM node:16
COPY . .
npm install -g node-waf
RUN yarn
CMD ["yarn", "run", "prod"]
EXPOSE 9000