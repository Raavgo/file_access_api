FROM python:3.10-alpine

RUN mkdir -p /usr/src/app \
 && mkdir -p /usr/src/app/files

WORKDIR /usr/src/app

COPY requirements.txt /usr/src/app/

RUN pip3 install --no-cache-dir -r requirements.txt

COPY . /usr/src/app/
ENTRYPOINT ["python3"]

CMD ["main.py"]