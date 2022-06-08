FROM ubuntu:22.04
RUN apt-get -y update \
    && apt-get -y install nodejs  \
    && apt-get -y install npm \
    && apt-get install -y wget \
    && rm -rf /var/lib/apt/lists/*

RUN npm install
RUN mkdir -p /usr/src/worker
RUN mkdir -p /usr/src/worker/files
RUN mkdir -p /usr/src/worker/images
RUN mkdir -p /usr/src/worker/videos

WORKDIR /usr/src/worker

RUN wget https://johnvansickle.com/ffmpeg/builds/ffmpeg-git-amd64-static.tar.xz \
    && mkdir -p ffmpeg_dir  \
    && tar xvf ffmpeg-git-amd64-static.tar.xz -C ffmpeg_dir --strip-components 1 \
    && rm -f ffmpeg-git-amd64-static.tar.xz \
    && echo $PATH /usr/local/bin:/usr/local/sbin:/usr/bin:/usr/sbin:/bin:/sbin \
    &&  mv ffmpeg_dir/ffmpeg ffmpeg_dir/ffprobe /usr/local/bin/

COPY . /usr/src/worker

EXPOSE 8000

CMD ["node", "worker.js"]