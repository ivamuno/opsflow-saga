#!/bin/bash

# SetupSaga
# Commands
docker exec -it message-broker-orch rabbitmqadmin -u admin -p admin declare exchange name=SetupSaga-exchange-request type=topic
docker exec -it message-broker-orch rabbitmqadmin -u admin -p admin declare exchange name=SetupSaga-exchange-response type=fanout

docker exec -it message-broker-orch rabbitmqadmin -u admin -p admin declare queue name=SetupSaga-acehub-queue-request durable=true
docker exec -it message-broker-orch rabbitmqadmin -u admin -p admin declare queue name=SetupSaga-payon-queue-request durable=true
docker exec -it message-broker-orch rabbitmqadmin -u admin -p admin declare queue name=saga-SetupSaga-response durable=true

docker exec -it message-broker-orch rabbitmqadmin -u admin -p admin declare binding source=SetupSaga-exchange-request destination=SetupSaga-acehub-queue-request routing_key=SetupSaga-acehub-route-request
docker exec -it message-broker-orch rabbitmqadmin -u admin -p admin declare binding source=SetupSaga-exchange-request destination=SetupSaga-payon-queue-request routing_key=SetupSaga-payon-route-request

# Events
docker exec -it message-broker-orch rabbitmqadmin -u admin -p admin declare exchange name=SetupSaga-exchange-events type=fanout
docker exec -it message-broker-orch rabbitmqadmin -u admin -p admin declare queue name=SetupSaga-queue-events durable=true
docker exec -it message-broker-orch rabbitmqadmin -u admin -p admin declare binding source=SetupSaga-exchange-events destination=SetupSaga-queue-events

#docker exec -it message-broker-orch rabbitmqadmin -u admin -p admin export rabbit.config
#docker exec -it message-broker-orch cat rabbit.config