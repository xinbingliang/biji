````nginx
upstream api{
        server 127.0.0.1:6002;
}

server {
        listen 80;
        server_name _;

        location /api {
                proxy_pass http://api/;
        }

        location /admin {
			try_files $uri $uri/ /;
        }

        location / {
                root /var/www/admin_of_micro_video/production;
                index index.html;
        }
}
````

