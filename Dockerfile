FROM node

# make the 'app' folder the current working directory
WORKDIR /app

# copy 'package.json' to install dependencies
COPY package*.json ./

# install dependencies
RUN npm install --force
# copy files and folders to the current working directory (i.e. 'app' folder)
COPY . .
# build app for production with minification
RUN npm run build
EXPOSE 5173
CMD [ "npm", "run", "dev" ]

