# Config-Listener Service:
</br>
1 This service is use to monitor configuration changes in PlanloaderConfigDb </br>
2 It recheck after a specific period of time (1 min) </br>
3 If there is any change in config table, trigger is called which set production, development, test to zero 
    UPDATE delivery_status SET 
		production = 0,
        development = 0, 
        test = 0,
        config_updated_time = NOW()
	WHERE id = 1;   </br>    
4 If configuration change is found then it execute the restart-all-services.sh shell file which go to each directory of services and call ./restart-pm2.sh shell file. In short it restart all the services and service get the latest configurations. </br>
5 Give execute permission to  restart-all-services.sh  file as  sudo chmod 755 ./restart-all-services.sh</br>
6 Make sure this service is in the same directory where you clone the planloader service