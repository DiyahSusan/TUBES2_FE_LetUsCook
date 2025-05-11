# Build stage. "Install" node.js inside the container
FROM node:22 AS builder

# directory inside the container
# copies the package needed
# install everything needed (packages etc)
# copies code
# run and build the app
WORKDIR /app
COPY src/package*.json ./src/
COPY src/tsconfig.json ./src/
WORKDIR /app/src
RUN npm install
COPY src/ ./
RUN npm run build:docker

# Runtime image
FROM node:20-alpine

# copy the app to the image
WORKDIR /app
COPY --from=builder /app/src ./

# Start!
EXPOSE 3000
CMD ["npm", "start"]
