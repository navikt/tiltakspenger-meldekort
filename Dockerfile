FROM node:22-alpine

WORKDIR /app

COPY node_modules /app/node_modules/
COPY server/dist  /app/

ENV PORT 3050
ENV NODE_ENV production
ENV TZ=Europe/Oslo

EXPOSE 3050

CMD ["node", "server.cjs"]
