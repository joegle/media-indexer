redis:
	redis-server /usr/local/etc/redis.conf &
ssl:
	# http://blog.mgechev.com/2014/02/19/create-https-tls-ssl-application-with-express-nodejs/
	openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365
	openssl rsa -in key.pem -out newkey.pem && mv newkey.pem key.pem
	mkdir ssl
	mv key.pem ssl/
	mv cert.pem ssl/
