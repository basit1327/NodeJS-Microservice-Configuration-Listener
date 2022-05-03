require('dotenv').config(),
require('colors');
let mysql = require('mysql2/promise');
const cron = require('node-cron');
const cp = require('child_process');
let updateInProgress = false;
let {createVHostConfig} = require('./create_vhost')

let connection;
let isFirstTime = true;
const PlanloaderConfigDbHost = process.env.PlanloaderConfigDbHost;
const PlanloaderConfigDbUsername = process.env.PlanloaderConfigDbUsername;
const PlanloaderConfigDbPassword = process.env.PlanloaderConfigDbPassword;
const PlanloaderConfigDbDatabase = process.env.PlanloaderConfigDbDatabase;
const PlanloaderConfigEnv = process.env.PlanloaderConfigEnv;

(async ()=>{

    if(!PlanloaderConfigDbHost || !PlanloaderConfigDbPassword){
        console.log('Planloader secret db credentials not found form environment variables'.red);
        process.exit(1);
    }

    console.log('Config listener service started successfully'.green);

    connection = await mysql.createConnection({
        host: PlanloaderConfigDbHost,
        user: PlanloaderConfigDbUsername,
        password: PlanloaderConfigDbPassword,
        database: PlanloaderConfigDbDatabase
    });

    cron.schedule("*/30 * * * * *", function() {
        if(updateInProgress){
            console.log('Update already in progress, New update is queued.');   
            return;
        }
        console.log("Checking configuration updates".blue);
        checkConfigUpdate();
    });
})()

async function checkConfigUpdate(){
    try {
        if(!PlanloaderConfigDbHost || !PlanloaderConfigDbPassword){
            throw 'Planloader secret db credentials not found form environment variables'
        }
        if(!connection){
            connection = await mysql.createConnection({
                host: PlanloaderConfigDbHost,
                user: PlanloaderConfigDbUsername,
                password: PlanloaderConfigDbPassword,
                database: PlanloaderConfigDbDatabase
            });
        }

        if(!connection) { throw 'Failed to connect to PlanloaderConfigDb'}

        if(isFirstTime){
            console.log('Starting planloader services...'.yellow);
            executeScriptForRestartAllServices();
            isFirstTime = false;
        }
        else{
            const [rows] = await connection.execute(`SELECT * FROM delivery_status WHERE ${PlanloaderConfigEnv} = 0`);
            if(rows && rows.length){
                console.log('Configurations Updates found'.green);
                console.log('Marking new update as read!'.blue);
                await connection.execute(`UPDATE delivery_status SET ${PlanloaderConfigEnv} = 1 where id =1`);
                console.log('Config update mark as read!'.green);
                console.log('Restarting Planloader services with updated configuations...'.yellow);
                executeScriptForRestartAllServices();
            }
            else {
                console.log('No configuration update found'.yellow);
            }
        }
    } catch (err) {
        console.log(err.toString().red);
        process.exit(1);
    }
};

async function executeScriptForRestartAllServices (){
    try {
        updateInProgress = true;
        await new Promise((resolve, reject)=>{
            cp.exec('./restart-all-services.sh', (err, stdout, stderr) => {
                if(err) {
                  console.log('Failed to restart all pm2 services, bash script error'.red,err);
                  reject(err);
                }
                else{
                    console.log(stdout);
                    console.log('Planloader services restarted with updated configuations'.green)
                    resolve(true)
                    getHostConfiguartion();
                }
              })
        })
    } catch (error) {
        console.log(error)
    }
    finally{
        updateInProgress = false;
    }
}

async function getHostConfiguartion (){
    try {
        if(!connection){
            connection = await mysql.createConnection({
                host: PlanloaderConfigDbHost,
                user: PlanloaderConfigDbUsername,
                password: PlanloaderConfigDbPassword,
                database: PlanloaderConfigDbDatabase
            });
        }

        if(!connection) { throw 'Failed to connect to PlanloaderConfigDb'}

        const [rows] = await connection.execute(`SELECT * FROM config;`);
        if(rows && rows.length){
            createVHostConfig(rows, PlanloaderConfigEnv)
        }
        else {
            console.log('No configuration update found'.yellow);
        }
    } catch (err) {
        console.log(err.toString().red);
        process.exit(1);
    }
}