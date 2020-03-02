FROM node:10 AS builder
LABEL description="Shift Explorer Docker Image" version="1.5.0"

ARG DEBIAN_FRONTEND=noninteractive
ENV TOP=true
ENV TERM=xterm
ENV NPM_CONFIG_PREFIX=/home/shift/.npm-global
ENV PATH=$PATH:/home/shift/.npm-global/bin 
# optionally if you want to run npm global bin without specifying path

# Install Dependencies
WORKDIR /~
RUN apt-get update && apt-get upgrade -y && apt-get install -y build-essential jq redis-server

FROM builder AS shiftuser
# Create shift user & group
RUN useradd -ms /bin/bash shift

# Configure Global NPM Folder
USER shift
WORKDIR /home/shift
RUN mkdir .npm-global && npm config set prefix "~/.npm-global" &&\ 
    export PATH=~/.npm-global/bin:$PATH && /bin/bash -c "source ~/.profile" &&\
    npm install -g pm2 grunt-cli

# Install Shift Explorer
FROM shiftuser as shiftexplorer
USER shift
WORKDIR /home/shift
# Copy Assets
COPY ./package.json .
# COPY ./package-lock.json .
RUN yarn
COPY --chown=shift:shift . .

# Run webpack build
RUN cd /home/shift && yarn build:prd

USER shift
WORKDIR /home/shift
CMD ["node", "app.js"]