############################################################
##	Zonemaster All-In-One docker image
##
## DO NOT USE THIS IMAGE IN PRODUCTION
##
############################################################
FROM zonemaster/backend:local

ARG S6_OVERLAY_VERSION=3.2.1.0

EXPOSE 80

USER root
COPY ./zonemaster_web_gui.zip .

RUN apk add apache2 apache2-proxy

RUN install -vd /var/www/html/zonemaster-web-gui
RUN install -vd /var/log/zonemaster
RUN unzip -d /var/www/html/zonemaster-web-gui zonemaster_web_gui.zip
RUN rm -f zonemaster_web_gui.zip

# Enable apache module
RUN echo "LoadModule rewrite_module modules/mod_rewrite.so" >> /etc/apache2/httpd.conf
RUN echo "LoadModule proxy_module modules/mod_proxy.so" >> /etc/apache2/httpd.conf
RUN echo "LoadModule proxy_http_module modules/mod_proxy_http.so" >> /etc/apache2/httpd.conf
RUN cat /var/www/html/zonemaster-web-gui/zonemaster.conf-example >>  /etc/apache2/httpd.conf

# Install S6
ADD https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-noarch.tar.xz /tmp
RUN tar -C / -Jxpf /tmp/s6-overlay-noarch.tar.xz
ADD https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-x86_64.tar.xz /tmp
RUN tar -C / -Jxpf /tmp/s6-overlay-x86_64.tar.xz

# HTTP service
RUN mkdir /etc/s6-overlay/s6-rc.d/httpd
RUN echo "longrun" > /etc/s6-overlay/s6-rc.d/httpd/type
RUN echo "#!/command/execlineb -P" > /etc/s6-overlay/s6-rc.d/httpd/run
RUN echo "httpd -DFOREGROUND" >> /etc/s6-overlay/s6-rc.d/httpd/run

# RPCAPI service
RUN mkdir /etc/s6-overlay/s6-rc.d/rpcapi
RUN echo "longrun" > /etc/s6-overlay/s6-rc.d/rpcapi/type
RUN echo "#!/command/execlineb -P" > /etc/s6-overlay/s6-rc.d/rpcapi/run
RUN echo "zonemaster_launch rpcapi" >> /etc/s6-overlay/s6-rc.d/rpcapi/run

# TESTAGENT sevice
RUN mkdir /etc/s6-overlay/s6-rc.d/testagent
RUN echo "longrun" > /etc/s6-overlay/s6-rc.d/testagent/type
RUN echo "#!/command/execlineb -P" > /etc/s6-overlay/s6-rc.d/testagent/run
RUN echo "zonemaster_launch testagent" >> /etc/s6-overlay/s6-rc.d/testagent/run

RUN touch /etc/s6-overlay/s6-rc.d/user/contents.d/httpd
RUN touch /etc/s6-overlay/s6-rc.d/user/contents.d/rpcapi
RUN touch /etc/s6-overlay/s6-rc.d/user/contents.d/testagent
COPY zonemaster_launch_gui /usr/local/bin

ENTRYPOINT ["/usr/local/bin/zonemaster_launch_gui"]
