FROM node:17-alpine

RUN apk update

WORKDIR /app/info_quest_frontend/

COPY /info_quest_frontend/package.json /app/info_quest_frontend/

RUN npm install

COPY /info_quest_frontend/src  /app/info_quest_frontend/src/
COPY /info_quest_frontend/public /app/info_quest_frontend/public/

RUN npm run build

FROM node:17-alpine

RUN apk update
RUN apk add bash
RUN apk add supervisor
RUN npm install -g serve
RUN apk add python3
RUN apk add py3-pip

COPY /info_quest_backend/data/ /app/info_quest_backend/data/
COPY /info_quest_backend/*.py /app/info_quest_backend/
COPY /info_quest_backend/requirements.txt /app/info_quest_backend/
COPY /info_quest_backend/run.sh /app/info_quest_backend/
RUN python3 -m pip install --no-cache-dir -r /app/info_quest_backend/requirements.txt
RUN chmod +x /app/info_quest_backend/run.sh

COPY --from=0 /app/info_quest_frontend/build/ /app/info_quest_frontend/build

WORKDIR /app
COPY supervisord.conf .

EXPOSE 3000
EXPOSE 8000

# RUN bash backend/run.sh
# CMD ["bash", "info_quest_backend/run.sh"]
# CMD ["serve", "-s", "info_quest_frontend/build"]
# RUN ls /
CMD ["/usr/bin/supervisord"]

