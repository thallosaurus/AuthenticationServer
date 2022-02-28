FROM node:16
COPY . .
RUN yarn
CMD ["yarn", "run", "prod"]
EXPOSE 9000