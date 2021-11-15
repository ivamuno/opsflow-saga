# Example of creating a container image that will run as a user 'mssql' instead of root
# This is example is based on the official image from Microsoft and effectively changes the user that SQL Server runs as
# and allows for dumps to generate as a non-root user

FROM mcr.microsoft.com/mssql/server:2017-latest

RUN useradd -M -s /bin/bash -u 10001 -g 0 mssql
RUN mkdir -p -m 770 /var/opt/mssql && chgrp -R 0 /var/opt/mssql

COPY ./scripts .

USER 10001

CMD ["/opt/mssql/bin/sqlservr"]