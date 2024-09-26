FROM node:20-alpine as runtime

ARG ENVIRONMENT

#Virker som denne trengs for å få lov å hente ned dekoratøren
RUN --mount=type=secret,id=NODE_AUTH_TOKEN sh -c \
    'npm config set //npm.pkg.github.com/:_authToken=$(cat /run/secrets/NODE_AUTH_TOKEN)'
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.

#Packages with the @navikt scope will be fetched from GitHub Packages rather than the default npm registry.
RUN npm config set @navikt:registry=https://npm.pkg.github.com

RUN apk add --no-cache libc6-compat

WORKDIR /usr/app

COPY package.json package-lock.json ./
RUN npm ci

COPY next.config.mjs tsconfig.json ./
COPY pages pages
COPY styles styles
COPY public public

RUN npm run build 

COPY .next/static ./.next/static
COPY .next/standalone ./

ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000
ENV NODE_ENV production
ENV TZ=Europe/Oslo

EXPOSE 3000

CMD ["node", "server.js"]
