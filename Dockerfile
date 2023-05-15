FROM circleci/node:8.11.2-stretch as build
MAINTAINER "Kartheek Palla" "kartheekp@ilimi.in"
USER root
COPY src /opt/program-service/
WORKDIR /opt/program-service/
RUN sed -i '/^mozilla\/DST_Root_CA_X3/s/^/!/' /etc/ca-certificates.conf && update-ca-certificates -f
RUN npm install
CMD ["node --use-openssl-ca", "app.js", "&"]
