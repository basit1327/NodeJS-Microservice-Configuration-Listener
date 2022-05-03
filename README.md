
# NodeJS Microservice Configuration Listerner
##### Setting up dozens of microservices and there connectivity in hazle free approach
#### Architecture for spinning the passwords/keys and other runtime configuration which able services to respond to updated configuration without manually setting them on server.

    1. It All start from creating a configuration database for different environment e.g dev/uat/prod (same but different values).
    2. Credenitals to read these configuration is stored on host operating system.
    3. Thats all configuration you needed to setup dozens of Microservice and there communication.
    4. When this service start or new configuration found it will automatically setup Apache vhosts and restart apache service for linux environment.
![Architecture](https://i.ibb.co/qJzc2vX/Service-path.png)

## Solution Requirement

- Secure credentials
- Scalable 
- Easy Montioring (in case of issue we can drill down to actual issue)
- Easy setup, Easy rollback
- Minimal human involvement


## Why this idea

- This idea came from the need, in older implementation whenever a new service is launch we have to setup its connectivity e.g vhost. 
Doing code changes to let other service know new service. 
- Spinning credentials was all manuall, You have to update .env file on server manually

## Steps
- Run Command ``` pm2 ecosystem.config.js ``` As it run ```index.js``` with pm2
- This service is use to monitor configuration changes in PlanloaderConfigDb
- If there is any change in config table, trigger is called which set production, development, test to zero UPDATE delivery_status SET production = 0, development = 0, test = 0, config_updated_time = NOW() WHERE id = 1;
- Give execute permission to restart-all-services.sh file as ```sudo chmod 755 ./restart-all-services.sh```
-  Make sure this service is in the same directory where you clone the planloader service
