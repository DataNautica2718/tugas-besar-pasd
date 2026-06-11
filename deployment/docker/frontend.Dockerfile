# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency files relative to root context
COPY frontend/package*.json ./
RUN npm install

# Copy frontend source files
COPY frontend/ .
RUN npm run build

# Serve stage
FROM nginx:alpine

# Copy built assets and Nginx configuration
COPY --from=build /app/dist /usr/share/nginx/html
COPY deployment/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
