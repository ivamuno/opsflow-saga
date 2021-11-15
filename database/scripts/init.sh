#!/bin/bash

#run the setup script to create the DB and the schema in the DB
docker exec -it sql-server-orch opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P paSSword1234! -d master -i 01.opsflow-database.sql
docker exec -it sql-server-orch opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P paSSword1234! -d master -i 02.saga-tables.sql

