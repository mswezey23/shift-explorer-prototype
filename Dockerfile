FROM node:6 AS builder

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get --assume-yes install --no-install-recommends \
        build-essential \
        jq \
	redis-server && \
    npm install -g grunt && \
    npm install -g bower

COPY . /home/shift/shift-explorer/
RUN useradd shift && \
    chown shift:shift -R /home/shift
USER shift
RUN cd /home/shift/shift-explorer && \
    npm install
RUN cd /home/shift/shift-explorer && \
    npm run build && \
    redis-server --daemonize yes && \
    grunt candles:build && \
    grunt candles:update


FROM node:6-alpine

RUN adduser -D shift 
COPY --chown=shift:shift --from=builder /home/shift /home/shift
COPY --chown=shift:shift config.docker.js /home/shift/shift-explorer/config.js

USER shift
WORKDIR /home/shift/shift-explorer
CMD ["node", "app.js"]