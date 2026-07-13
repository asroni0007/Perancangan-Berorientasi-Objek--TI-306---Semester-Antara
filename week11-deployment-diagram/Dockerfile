FROM node:20-alpine
WORKDIR /app
COPY server.js ai-service.js ./
ENV PORT=3000
EXPOSE 3000 3001
CMD ["node", "server.js"]
