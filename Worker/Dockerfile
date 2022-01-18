FROM ubuntu
RUN apt-get -y update \
    && apt-get -y install nodejs  \
    && apt-get -y install npm \
    && apt-get install -y wget \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr/src/worker
RUN mkdir -p /usr/src/worker/files

WORKDIR /usr/src/worker

RUN wget https://johnvansickle.com/ffmpeg/builds/ffmpeg-git-amd64-static.tar.xz
RUN mkdir -p ffmpeg_dir  \
    && tar xvf ffmpeg-git-amd64-static.tar.xz -C ffmpeg_dir --strip-components 1\
    && rm -f ffmpeg-git-amd64-static.tar.xz

RUN  echo $PATH /usr/local/bin:/usr/local/sbin:/usr/bin:/usr/sbin:/bin:/sbin \
     &&  mv ffmpeg_dir/ffmpeg ffmpeg_dir/ffprobe /usr/local/bin/


COPY . /usr/src/worker
RUN npm install
EXPOSE 8001

RUN node worker.js
#CMD ["node", "worker.js"]