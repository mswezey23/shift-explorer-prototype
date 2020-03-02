#!/bin/sh
mkdir -p /tmp/freegeoip

[ -f "/db.gz" ] && cp /db.gz /tmp/freegeoip/db.gz

exec /freegeoip -use-x-forwarded-for
