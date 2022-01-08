FROM python:3.6-alpine

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/files

WORKDIR /usr/src/app

COPY requirements.txt /usr/src/app/

RUN pip3 install --no-cache-dir -r requirements.txt

COPY swagger_server/main.py /usr/src/app

ENTRYPOINT ["python3"]

CMD ["main.py"]