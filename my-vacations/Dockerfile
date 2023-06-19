#Inheirt current image from alpine
FROM node:18-alpine

#create an empty directory
WORKDIR /app

#copy local package*.json into /app:
COPY package*.json /app

#install npm dependencies:
RUN npm i

#copy project loca files into /app:
COPY . /app/

#execute npm start
ENTRYPOINT npm start


# # First stage - inherit current image from an alpine image containing node (for latest versions use node:alpine):
# FROM node:18-alpine3.16 AS build-stage

# # Set /tmp folder as the Current Directory for building the project:
# WORKDIR /tmp

# # Copy local package.json & package-lock.json into /tmp:
# COPY package*.json /tmp

# # Install npm dependencies & devDependencies:
# RUN npm i

# # Copy project local files (first dot) into /tmp:
# COPY . /tmp

# # Creating React env variable for production backend address. Note: (1) any variable must start with REACT_APP_ (2) this must be done before npm run build:
# ENV REACT_APP_BACKEND_BASE_URL=http://174.138.60.138:5000/api/

# # Compile project resides in /tmp (WORKDIR) which generates final react files /tmp/build:
# RUN npm run build

# # -----------------------------------------------------------------------

# # Second stage - overrun prev stage with alpine image containing nginx (for latest version use nginx:alpine):
# FROM nginx:alpine AS production-stage

# # Set /app as the working directory:
# WORKDIR /app

# # Copy JavaScript files from previous stage's /tmp/build into nginx special web expose directory:
# COPY --from=build-stage /tmp /app

# # CMD ["npm", "start"]
# ENTRYPOINT ["npm", "run", "build"]