#!/bin/sh

# First go to parent dir
cd .. 
# Restarting Auth Service
cd planloader-auth-service
./restart-pm2.sh
cd ..

# Restarting Router Service
cd Planloader-API-gateway
./restart-pm2.sh
cd ..

# Restarting User Service
cd planloader-user-service
./restart-pm2.sh
cd ..

# Restarting Location Service
cd planloader-web-location-service
./restart-pm2.sh
cd ..

# Restarting Task Activity Service
cd Planloader-task-activity-service
./restart-pm2.sh
cd ..

# Restarting Account Service
cd planloader-accounts-service
./restart-pm2.sh
cd ..

# Restarting Project Service
cd planloader-projects-service
./restart-pm2.sh
cd ..

# Restarting Board Service
cd planloader-board-messaging-service
./restart-pm2.sh
cd ..

# Restarting Pubnub Service
cd planloader-pubnub-subscription-service
./restart-pm2.sh
cd ..

# Restarting Board Service
cd planloader-boards-service
./restart-pm2.sh
cd ..

# Restarting Notification Service
cd planloader-notification-service
./restart-pm2.sh
cd ..

# Restarting Swagger Service
cd planloader-swagger
./restart-pm2.sh
cd ..

echo 'All planlaoder services are refreshed with new configurations'