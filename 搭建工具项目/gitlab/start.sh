#!/bin/bash
docker rm -f gitlab
docker run -d -p 4443:4444 -p 8888:80 -p 2222:22 --name gitlab --restart always -v ~/gitlab/config:/etc/gitlab -v ~/gitlab/logs:/var/log/gitlab -v ~/gitlab/data:/var/opt/gitlab gitlab/gitlab-ce:12.9.0-ce.0
service nginx restart
echo "gitlab启动成功"

