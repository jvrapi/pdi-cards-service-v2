# step 1 - Build app
FROM node:lts-alpine as builder

LABEL stage="builder"

WORKDIR /app

COPY . .

RUN yarn

RUN yarn build

RUN rm -rf node_modules

RUN yarn --production

# step 2 - Run build app
FROM node:lts-alpine

LABEL author="run app"

WORKDIR /app

COPY --from=builder /app/dist  /app/dist
COPY --from=builder /app/node_modules  /app/node_modules
COPY --from=builder /app/prisma /app/prisma

EXPOSE 4000

CMD [ "node", "dist/main.js" ]