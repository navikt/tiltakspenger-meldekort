FROM node:22-alpine as runtime

COPY .next/static ./.next/static
COPY .next/standalone ./

ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3050
ENV NODE_ENV production
ENV TZ=Europe/Oslo

EXPOSE 3050

CMD ["node", "server.js"]
