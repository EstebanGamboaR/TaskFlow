# Dockerfile — Node.js Backend
#
# Multi-stage builds are not needed here (it's a dev image).
# For production, you'd add a separate stage that runs `node src/server.js`
# without nodemon and without source maps.

FROM node:22-alpine

WORKDIR /app

# Copy package files first (layer caching trick)
# Docker caches each layer. If package.json hasn't changed,
# it won't re-run npm install on every rebuild — saves time.
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
