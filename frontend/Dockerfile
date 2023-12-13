FROM node:18

WORKDIR /app/
COPY package*.json .
RUN npm install
ENV API_URL=http://api-backend:3028
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]