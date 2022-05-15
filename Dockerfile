FROM ubuntu:focal

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y curl
RUN apt-get install -y supervisor
RUN apt-get install -y python3
RUN apt-get install -y python3-pip
RUN curl -fsSL https://deb.nodesource.com/setup_17.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y python
RUN npm install -g serve

WORKDIR /app/info_quest_frontend/

# COPY /info_quest_frontend/package.json /info_quest_frontend/package-lock.json  /app/info_quest_frontend/
COPY /info_quest_frontend/package.json /app/info_quest_frontend/

RUN npm install

COPY /info_quest_frontend/src  /app/info_quest_frontend/src/
COPY /info_quest_frontend/public /app/info_quest_frontend/public/

RUN npm run build

WORKDIR /app/info_quest_backend/

COPY /info_quest_backend/ /app/info_quest_backend/

RUN python3 -m pip install --no-cache-dir -r requirements.txt
RUN chmod +x run.sh

EXPOSE 3000
EXPOSE 8000

WORKDIR /app
COPY supervisord.conf .

# RUN bash backend/run.sh
# CMD ["bash", "info_quest_backend/run.sh"]
# CMD ["serve", "-s", "info_quest_frontend/build"]
CMD ["/usr/bin/supervisord"]

