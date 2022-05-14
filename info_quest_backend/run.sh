#!/bin/sh
cd info_quest_backend
/usr/bin/python3 -m uvicorn main:info_quest --host 0.0.0.0 --port 8000
