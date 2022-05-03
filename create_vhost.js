require('colors');
let fs = require('fs');
const cp = require('child_process');
let 
    AUTH_SERVICE = 'AUTH_SERVICE';
    AUTH_SERVICE_PORT = 'AUTH_SERVICE_PORT';
    SWAGGER_SERVICE = 'SWAGGER_SERVICE';
    SWAGGER_SERVICE_PORT = 'SWAGGER_SERVICE_PORT';
    USER_SERVICE = 'USER_SERVICE';
    USER_SERVICE_PORT = 'USER_SERVICE_PORT';
    TASK_ACTIVITY_SERVICE = 'TASK_ACTIVITY_SERVICE';
    TASK_ACTIVITY_SERVICE_PORT = 'TASK_ACTIVITY_SERVICE_PORT';
    ACCOUNT_SERVICE = 'ACCOUNT_SERVICE';
    ACCOUNT_SERVICE_PORT = 'ACCOUNT_SERVICE_PORT';
    PROJECT_SERVICE = 'PROJECT_SERVICE';
    PROJECT_SERVICE_PORT = 'PROJECT_SERVICE_PORT';
    NOTIFICATION_SERVICE = 'NOTIFICATION_SERVICE';
    NOTIFICATION_SERVICE_PORT = 'NOTIFICATION_SERVICE_PORT';
    MESSAGING_SERVICE = 'MESSAGING_SERVICE';
    MESSAGING_SERVICE_PORT = 'MESSAGING_SERVICE_PORT';
    ROUTER_SERVICE = 'ROUTER_SERVICE';
    ROUTER_SERVICE_PORT = 'ROUTER_SERVICE_PORT';
    BOARD_SERVICE = 'BOARD_SERVICE';
    BOARD_SERVICE_PORT = 'BOARD_SERVICE_PORT';
    LOCATION_SERVICE = 'LOCATION_SERVICE';
    LOCATION_SERVICE_PORT = 'LOCATION_SERVICE_PORT';

function createHostConfigFile (configEnv){

    let resetVariables = ()=>{ 
        AUTH_SERVICE = 'AUTH_SERVICE';
        AUTH_SERVICE_PORT = 'AUTH_SERVICE_PORT';
        SWAGGER_SERVICE = 'SWAGGER_SERVICE';
        SWAGGER_SERVICE_PORT = 'SWAGGER_SERVICE_PORT';
        USER_SERVICE = 'USER_SERVICE';
        USER_SERVICE_PORT = 'USER_SERVICE_PORT';
        TASK_ACTIVITY_SERVICE = 'TASK_ACTIVITY_SERVICE';
        TASK_ACTIVITY_SERVICE_PORT = 'TASK_ACTIVITY_SERVICE_PORT';
        ACCOUNT_SERVICE = 'ACCOUNT_SERVICE';
        ACCOUNT_SERVICE_PORT = 'ACCOUNT_SERVICE_PORT';
        PROJECT_SERVICE = 'PROJECT_SERVICE';
        PROJECT_SERVICE_PORT = 'PROJECT_SERVICE_PORT';
        NOTIFICATION_SERVICE = 'NOTIFICATION_SERVICE';
        NOTIFICATION_SERVICE_PORT = 'NOTIFICATION_SERVICE_PORT';
        MESSAGING_SERVICE = 'MESSAGING_SERVICE';
        MESSAGING_SERVICE_PORT = 'MESSAGING_SERVICE_PORT';
        ROUTER_SERVICE = 'ROUTER_SERVICE';
        ROUTER_SERVICE_PORT = 'ROUTER_SERVICE_PORT';
        BOARD_SERVICE = 'BOARD_SERVICE';
        BOARD_SERVICE_PORT = 'BOARD_SERVICE_PORT';
        LOCATION_SERVICE = 'LOCATION_SERVICE';
        LOCATION_SERVICE_PORT = 'LOCATION_SERVICE_PORT';
    }
    let hosts = `
            <Location /${getEndPoint(AUTH_SERVICE)}> 
                ProxyPass http://127.0.0.1:${AUTH_SERVICE_PORT}/${getEndPoint(AUTH_SERVICE)}
                ProxyPassReverse http://127.0.0.1:${AUTH_SERVICE_PORT} 
            </Location> 
            <Location /${getEndPoint(SWAGGER_SERVICE)}> 
                ProxyPass http://127.0.0.1:${SWAGGER_SERVICE_PORT}/${getEndPoint(SWAGGER_SERVICE)}
                ProxyPassReverse http://127.0.0.1:${SWAGGER_SERVICE_PORT}/${getEndPoint(SWAGGER_SERVICE)} 
            </Location> 
            <Location /${getEndPoint(USER_SERVICE)}> 
                ProxyPass http://127.0.0.1:${USER_SERVICE_PORT}/${getEndPoint(USER_SERVICE)}
                ProxyPassReverse http://127.0.0.1:${USER_SERVICE_PORT}/${getEndPoint(USER_SERVICE)}
            </Location> 
            <Location /${getEndPoint(TASK_ACTIVITY_SERVICE)}> 
                ProxyPass http://127.0.0.1:${TASK_ACTIVITY_SERVICE_PORT}/${getEndPoint(TASK_ACTIVITY_SERVICE)} 
                ProxyPassReverse http://127.0.0.1:${TASK_ACTIVITY_SERVICE_PORT}/${getEndPoint(TASK_ACTIVITY_SERVICE)}
            </Location> 
            <Location /${getEndPoint(ACCOUNT_SERVICE)}> 
                ProxyPass http://127.0.0.1:${ACCOUNT_SERVICE_PORT}/${getEndPoint(ACCOUNT_SERVICE)}
                ProxyPassReverse http://127.0.0.1:${ACCOUNT_SERVICE_PORT}/${getEndPoint(ACCOUNT_SERVICE)}
            </Location> 
            <Location /${getEndPoint(PROJECT_SERVICE)}> 
                ProxyPass http://127.0.0.1:${PROJECT_SERVICE_PORT}/${getEndPoint(PROJECT_SERVICE)} 
                ProxyPassReverse http://127.0.0.1:${PROJECT_SERVICE_PORT}/${getEndPoint(PROJECT_SERVICE)} 
            </Location> 
            <Location /${getEndPoint(NOTIFICATION_SERVICE)}> 
                ProxyPass http://127.0.0.1:${NOTIFICATION_SERVICE_PORT}/${getEndPoint(NOTIFICATION_SERVICE)}
                ProxyPassReverse http://127.0.0.1:${NOTIFICATION_SERVICE_PORT}/${getEndPoint(NOTIFICATION_SERVICE)}
            </Location> 
            <Location /${getEndPoint(MESSAGING_SERVICE)}> 
                ProxyPass http://127.0.0.1:${MESSAGING_SERVICE_PORT}/${getEndPoint(MESSAGING_SERVICE)}
                ProxyPassReverse http://127.0.0.1:${MESSAGING_SERVICE_PORT}/${getEndPoint(MESSAGING_SERVICE)}
            </Location> 
            <Location /${getEndPoint(ROUTER_SERVICE)}> 
                ProxyPass http://127.0.0.1:${ROUTER_SERVICE_PORT} 
                ProxyPassReverse http://127.0.0.1:${ROUTER_SERVICE_PORT} 
            </Location> 
            <Location /${getEndPoint(BOARD_SERVICE)}> 
                ProxyPass http://127.0.0.1:${BOARD_SERVICE_PORT}/${getEndPoint(BOARD_SERVICE)}
                ProxyPassReverse http://127.0.0.1:${BOARD_SERVICE_PORT}/${getEndPoint(BOARD_SERVICE)}
            </Location> 
            <Location /${getEndPoint(LOCATION_SERVICE)}> 
                ProxyPass http://127.0.0.1:${LOCATION_SERVICE_PORT}/${getEndPoint(LOCATION_SERVICE)}
                ProxyPassReverse http://127.0.0.1:${LOCATION_SERVICE_PORT}/${getEndPoint(LOCATION_SERVICE)} 
            </Location>
            <Location /loader> 
                ProxyPass http://127.0.0.1:5000
                ProxyPassReverse http://127.0.0.1:5000
            </Location>
            <Location /loader-uat>
                ProxyPass http://127.0.0.1:5001
                ProxyPassReverse http://127.0.0.1:5001
            </Location>
            <Location /mssql-server>
                ProxyPass http://127.0.0.1:1433
                ProxyPassReverse http://127.0.0.1:1433
            </Location>
            <Location /swagger/v1/swagger.json>
                ProxyPass http://127.0.0.1/loader/swagger/v1/swagger.json
                ProxyPassReverse http://127.0.0.1/loader/swagger/v1/swagger.json
            </Location>
            <Location /api>
                ProxyPass http://127.0.0.1/loader/api
                ProxyPassReverse http://127.0.0.1/loader/api
            </Location>
            <Location /rewire-api>
                ProxyPass http://127.0.0.1:4000
                ProxyPassReverse http://127.0.0.1:4000
            </Location>
        `

        let http_hosts = `
            <VirtualHost *:80> 
            ServerName ${configEnv=='production' ? 'mobile': 'localhost'}.planloader.com 
            DocumentRoot "/var/www/html" 
            <Directory "/var/www/html"> 
                    Options FollowSymLinks Indexes MultiViews 
                    AllowOverride All 
                    Order allow,deny 
                    Allow from all 
            </Directory> 
             ${hosts}
            </VirtualHost>
        `;
        let https_hosts = `
        <VirtualHost *:443>
	        ServerName ${process.env.ServerName || 'app-mobile.planloader.com'}
	        <IfModule mod_mime.c>
                AddType application/x-javascript .js
                AddType text/css .css
            </IfModule>
            <IfModule mod_deflate.c>
                AddOutputFilterByType DEFLATE text/css application/json application/x-javascript text/x-component text/html text/plain text/xml application/javascript
                <IfModule mod_setenvif.c>
                        BrowserMatch ^Mozilla/4 gzip-only-text/html
                        BrowserMatch ^Mozilla/4.0[678] no-gzip
                        BrowserMatch bMSIE !no-gzip !gzip-only-text/html
                </IfModule>
            </IfModule>
	        SSLEngine on
            SSLCertificateFile /etc/ssl/planloader/planloader.crt
            SSLCertificateKeyFile /etc/ssl/planloader/planloader.key
            SSLCertificateChainFile /etc/ssl/planloader/digiCertCA.crt
            ${hosts}
        </VirtualHost>
        `;

        //Writing vhost file for http server
        fs.writeFile('../planloader-vhost.conf', http_hosts, (err)=>{
            if(err){
                console.log('Failed to write http vhost file'.red)
            }
            else{
                console.log('http Vhost file updated successfully'.green);
                if(configEnv === 'production'){
                    restartHttpdService(configEnv);
                }    
                else {
                    console.log('On development env, you have to restart XAMPP Apache server'.yellow);
                }            
                resetVariables();
            }
        });

        //Writing vhost file for https server
        fs.writeFile('../planloader-vhost-https.conf', https_hosts, (err)=>{
            if(err){
                console.log('Failed to write https vhost file'.red)
            }
            else{
                console.log('https Vhost file updated successfully'.green);
                if(configEnv === 'production'){
                    restartHttpdService(configEnv);
                }    
                else {
                    console.log('On development env, you have to restart XAMPP Apache server'.yellow);
                }            
                resetVariables();
            }
        });

        
}

function getEndPoint(address){
    return address.substr(address.lastIndexOf('.com')+5, address.length);
}

function createVHostConfig(configRows, configEnv='production'){
    console.log('Refreshing vhost configruation...'.yellow)
    setVariablesValues = (variable)=>{
        let filteredRows = configRows.filter(config=>config.key==variable);
        if(filteredRows.length) {
            variableValue = filteredRows[0][configEnv]; // configEnv -> production/development
        }
        return variableValue;
    }
    AUTH_SERVICE = setVariablesValues(AUTH_SERVICE);
    AUTH_SERVICE_PORT = setVariablesValues(AUTH_SERVICE_PORT);
    SWAGGER_SERVICE = setVariablesValues(SWAGGER_SERVICE);
    SWAGGER_SERVICE_PORT = setVariablesValues(SWAGGER_SERVICE_PORT);
    USER_SERVICE = setVariablesValues(USER_SERVICE);
    USER_SERVICE_PORT = setVariablesValues(USER_SERVICE_PORT);
    TASK_ACTIVITY_SERVICE = setVariablesValues(TASK_ACTIVITY_SERVICE);
    TASK_ACTIVITY_SERVICE_PORT = setVariablesValues(TASK_ACTIVITY_SERVICE_PORT);
    ACCOUNT_SERVICE = setVariablesValues(ACCOUNT_SERVICE);
    ACCOUNT_SERVICE_PORT = setVariablesValues(ACCOUNT_SERVICE_PORT);
    PROJECT_SERVICE = setVariablesValues(PROJECT_SERVICE);
    PROJECT_SERVICE_PORT = setVariablesValues(PROJECT_SERVICE_PORT);
    NOTIFICATION_SERVICE = setVariablesValues(NOTIFICATION_SERVICE);
    NOTIFICATION_SERVICE_PORT = setVariablesValues(NOTIFICATION_SERVICE_PORT);
    MESSAGING_SERVICE = setVariablesValues(MESSAGING_SERVICE);
    MESSAGING_SERVICE_PORT = setVariablesValues(MESSAGING_SERVICE_PORT);
    ROUTER_SERVICE = setVariablesValues(ROUTER_SERVICE);
    ROUTER_SERVICE_PORT = setVariablesValues(ROUTER_SERVICE_PORT);
    BOARD_SERVICE = setVariablesValues(BOARD_SERVICE);
    BOARD_SERVICE_PORT = setVariablesValues(BOARD_SERVICE_PORT);
    LOCATION_SERVICE = setVariablesValues(LOCATION_SERVICE);
    LOCATION_SERVICE_PORT = setVariablesValues(LOCATION_SERVICE_PORT);

    createHostConfigFile(configEnv);
}

async function restartHttpdService (){
    try {
        console.log('Restarting Apache httpd service....'.yellow)
        await new Promise((resolve, reject)=>{
            cp.exec('sudo apachectl restart', (err, stdout, stderr) => {
                if(err) {
                  console.log('Failed to restart Httpd service'.red,err);
                  reject(err);
                }
                else{
                    console.log(stdout);
                    console.log('Httpd service restarted successfully'.green)
                    resolve(true)
                }
              })
        })
    } catch (error) {
        console.log('Something went wrong while restarting Httpd service'.red,error);
        console.log(error)
    }
    finally{
        updateInProgress = false;
    }
}


module.exports = {
    createVHostConfig
}