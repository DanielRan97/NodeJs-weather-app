const chalk = require('chalk');
const request = require('request');
const successLog = chalk.green.inverse.bold;
const errorLog = chalk.bgWhite.red.bold;

const forecast = (lat,long,callback) => {

    const url = `http://api.weatherstack.com/current?access_key=cf5ca964a532b1f1b20c2f031aac0e79&query=${lat},${long}&units=m`;

    request({url, json : true}, (error,{body}) => {
        
        if(error){
           
            callback(errorLog('Unable to connect weatherstack service!') ,undefined);
       
        }else if(lat === '' || long === ''){
         
            callback(errorLog('Unable to find location, try another search'), undefined);
       
        }else if(body.success == false){
           
            callback(errorLog('Unable to find location, try another search'), undefined);
       
        }else{
            const currently = body.current ;
            callback(undefined,successLog(`${currently.weather_descriptions[0]}. its currently ${currently.temperature} degress out. its feel like ${currently.feelslike} degress out.
                        Wind speed is : ${currently.wind_speed}`))
           
        }

    })



}



module.exports = forecast;