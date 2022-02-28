FROM node:16
WORKDIR /app
COPY . .
RUN yarn
CMD ["yarn", "run", "prod"]
EXPOSE 9000