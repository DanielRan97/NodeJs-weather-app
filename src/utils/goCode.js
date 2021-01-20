const request = require('request');
const chalk = require('chalk');
const errorLog = chalk.bgWhite.red.bold;



const goCode = (address,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZGFuaWVscmFuIiwiYSI6ImNraXZxcG9rMzB6dnoyeG11ZXcwN3I1MXcifQ.rLt_u6FhUeLd86hSkv0GOw&limit=1`;
    
    request({url, json : true}, (error,{body}) => {
       if(error){
        
        callback(errorLog('Unable to connect goCode service!') ,undefined);
       
    }else if(address === ""){
        
        callback(errorLog('Unable to find location, try another search'), undefined);
       
    }else if(body.features.length === 0){
       
        callback(errorLog('Unable to find location, try another search'), undefined);
      
    }else{
       
        callback(undefined,{
            lat: body.features[0].center[1],
            long: body.features[0].center[0],
            location: body.features[0].place_name
           });
       }
    })
   }



   module.exports = goCode;