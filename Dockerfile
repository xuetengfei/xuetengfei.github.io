FROM node:12-alpine
WORKDIR /app
COPY . .
RUN yarn global add docsify-cli
EXPOSE 2222
CMD ["docsify","serve","/app","-p","2222"]