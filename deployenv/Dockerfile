FROM ubuntu:20.04


RUN \
  export DEBIAN_FRONTEND=noninteractive && \
  apt-get update -y && \
  apt-get upgrade -y && \
  apt-get install -yf adb unzip build-essential git python3.8 python3-dev python3-pip binutils postgresql-server-dev-12 libnss3 tzdata netcat curl nano nodejs npm libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb firefox


COPY requirements.txt /tmp/requirements.txt

ARG CACHEBUST=1



RUN pip3 install -r  /tmp/requirements.txt

RUN npm install -g npm@latest
RUN mkdir -p /srv/www/backend

ADD . /srv/www/backend
COPY bin /srv/www/bin
WORKDIR /srv/www/backend
RUN mkdir /srv/www/backend/celery-state
RUN chmod +x /srv/www/bin/*.sh
WORKDIR /srv/www/backend/cypress
RUN npm install
WORKDIR /srv/www/backend/cypress_feature
RUN npm install
WORKDIR /srv/www/backend
EXPOSE 80

CMD ["uwsgi", "--yaml", "/srv/www/backend/bin/uwsgi.yaml"]