FROM node:18-alpine

RUN npm i -g nodemon

RUN npm i -g ts-node

WORKDIR /app

COPY package*.json /app

RUN npm i

COPY . /app

ENTRYPOINT npm start



# # # First stage - inherit current image from an alpine image containing node (for latest versions use node:alpine):
# # FROM node:18-alpine3.16 AS build-stage

# # # Install typescript compiler globally for compiling to JavaScript:
# # RUN npm i -g ts-node

# # # Set /tmp folder as the Current Directory for compiling the project:
# # WORKDIR /tmp

# # # Copy local package.json & package-lock.json into /tmp:
# # COPY package*.json /tmp


# # # Install npm dependencies & devDependencies (required for TypeScript compiler):
# # RUN npm i

# # # Copy project local files (first dot) into /tmp:
# # COPY . /tmp

# # # Compile project resides in /tmp (WORKDIR) which generates JavaScript inside /tmp/build as stated in tsconfig.json:
# # RUN tsc

# # # -----------------------------------------------------------------------

# # # Second stage - inherit current image from an alpine image containing node (for latest versions use node:alpine):
# # FROM node:18-alpine3.16 AS production-stage

# # # Create an empty directory for project files and set it as the Current Directory:
# # WORKDIR /app

# # # Copy package.json & package-lock.json from previous stage's /tmp into /app:
# # COPY --from=build-stage /tmp/package*.json /app

# # # Copy JavaScript files from previous stage's /tmp/build into /app:
# # COPY --from=build-stage /tmp/build /app

# # # Copy vacation_photos directory from the backend directory into /app/vacation_photos:
# # COPY public ./public

# # # Install npm dependencies (without devDependencies):
# # RUN npm i --only=prod

# # # Execute "node /app/server.js" inside /app (WORKDIR) when container starts ("npm start" won't work cause it contains nodemon + ts-node starting command):
# # ENTRYPOINT node /app/server.js

# # First stage - inherit current image from an alpine image containing node (for latest versions use node:alpine):
# FROM node:18-alpine3.16 AS build-stage

# # Set /tmp folder as the Current Directory for building the project:
# WORKDIR /tmp

# # # Install typescript compiler globally for compiling to JavaScript:
# RUN npm i -g ts-node

# # Copy local package.json & package-lock.json into /tmp:
# COPY package*.json /tmp

# # Install npm dependencies & devDependencies:
# RUN npm i

# # Copy project local files (first dot) into /tmp:
# COPY . /tmp

# # # Creating React env variable for production backend address. Note: (1) any variable must start with REACT_APP_ (2) this must be done before npm run build:
# # ENV REACT_APP_BACKEND_BASE_URL=http://174.138.60.138:5000/api/

# # Compile project resides in /tmp (WORKDIR) which generates final react files /tmp/build:
# RUN npm run build

# # -----------------------------------------------------------------------

# # Second stage - inherit current image from an alpine image containing node (for latest versions use node:alpine):
# FROM node:18-alpine3.16 AS production-stage

# # Create an empty directory for project files and set it as the Current Directory:
# WORKDIR /app

# # Copy package.json & package-lock.json from previous stage's /tmp into /app:
# COPY --from=build-stage /tmp/package*.json /app

# # Copy JavaScript files from previous stage's /tmp/build into /app:
# COPY --from=build-stage /tmp /app

# #copy photo folder
# COPY public ./public

# # Install npm dependencies (without devDependencies):
# RUN npm i --only=prod

# # Execute "node /app/server.js" inside /app (WORKDIR) when container starts:
# CMD ["npm", "start"]

