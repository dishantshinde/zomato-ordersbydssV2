FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=DSS13@mysql
ENV MYSQL_DATABASE=zomato_orders
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=DSS13@mysql

EXPOSE 3306
