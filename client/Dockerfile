FROM node:20
EXPOSE 8080
WORKDIR /fe
COPY ./client .
RUN npm i
CMD ["npm", "run", "dev", "--", "--host"]


