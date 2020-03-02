# Note: WIP - not workin at the moment. Need to grab image published
#       from the docker repo
FROM alpine

RUN apk update && apk add bash

COPY ./public /var/www
COPY entrypoint.sh /entrypoint.sh
COPY freegeoip.exe /freegeoip.exe

RUN chmod +x /entrypoint.sh;
RUN chmod +x /freegeoip.exe;

ENV FREEGEOIP_UPDATE_INTERVAL 24h
ENV FREEGEOIP_RETRY_INTERVAL 6h
RUN adduser --disabled-password --shell /bin/bash freegeoip

USER freegeoip
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 8080

# CMD instructions:
# Add  "-use-x-forwarded-for"      if your server is behind a reverse proxy
# Add  "-public", "/var/www"       to enable the web front-end
# Add  "-internal-server", "8888"  to enable the pprof+metrics server
#
# Example:
# CMD ["-use-x-forwarded-for", "-public", "/var/www", "-internal-server", "8888"]
