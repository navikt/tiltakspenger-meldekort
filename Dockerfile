FROM node:24-alpine

WORKDIR /app

COPY node_modules /app/node_modules/
COPY server/dist  /app/dist/

ENV PORT=3050
ENV NODE_ENV=production
ENV TZ=Europe/Oslo

EXPOSE 3050

CMD ["node", "dist/server.cjs"]
