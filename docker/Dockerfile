############################################################
##	Zonemaster All-In-One docker image
##
## DO NOT USE THIS IMAGE IN PRODUCTION
##
############################################################
FROM zonemaster/backend:local

ARG version

EXPOSE 80

USER root
COPY ./zonemaster_web_gui_${version}.zip .

RUN apk add apache2 apache2-proxy

RUN install -vd /var/www/html/zonemaster-web-gui /var/log/zonemaster && \
	unzip -d /var/www/html/zonemaster-web-gui zonemaster_web_gui_${version}.zip && \
	rm -f zonemaster_web_gui_${version}.zip

# Enable apache module
RUN echo "LoadModule rewrite_module modules/mod_rewrite.so" >> /etc/apache2/httpd.conf
RUN echo "LoadModule proxy_module modules/mod_proxy.so" >> /etc/apache2/httpd.conf
RUN echo "LoadModule proxy_http_module modules/mod_proxy_http.so" >> /etc/apache2/httpd.conf
RUN cat /var/www/html/zonemaster-web-gui/zonemaster.conf-example >>  /etc/apache2/httpd.conf

# HTTP service
RUN mkdir /etc/s6-overlay/s6-rc.d/httpd
RUN echo "longrun" > /etc/s6-overlay/s6-rc.d/httpd/type
RUN echo "#!/command/execlineb -P" > /etc/s6-overlay/s6-rc.d/httpd/run
RUN echo "httpd -DFOREGROUND" >> /etc/s6-overlay/s6-rc.d/httpd/run

RUN touch /etc/s6-overlay/s6-rc.d/user/contents.d/httpd

COPY docker/zonemaster_launch_gui /usr/local/bin

ENTRYPOINT ["/usr/local/bin/zonemaster_launch_gui"]
