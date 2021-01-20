const path = require('path');
const express = require('express');
const hbs = require('hbs');
const chalk = require('chalk');
const goCode = require('./utils/goCode');
const foreCast = require('./utils/forecast');
const { error } = require('console');

const app = express();
const port = process.env.PORT || 3000; 
const pulicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);   
hbs.registerPartials(partialsPath); 

app.use(express.static(pulicDirectoryPath));

app.get('', (req,res) => {
    res.render('index', {
        title:"Weather",
        name: "Daniel Ran"
    });
})
 
app.get('/about', (req,res) => {
    res.render('about',{
        title:"About Me",
        name: "Daniel Ran"
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        message: "This is my help",
        title:'help',
        name: 'Daniel Ran'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:"You must provide address term!"
        })
    }
        goCode(req.query.address, (error, {lat, long, location} = {}) => {
        if(error){
            return  res.send({error})
          }
          foreCast(lat,long, (error, forecast) => {
              if(error){
                  return  console.log(errorLog(error));
                }
                res.send({
                    forecast,
                    location,
                    address:req.query.address,
                    lat,
                    long
                }
                );
            })
        })
});

app.get('/weather/location', (req,res) => {
    foreCast(req.query.lat,req.query.long, (error, forecast) => {
        if(error){
            return  console.log(errorLog(error));
          }
          res.send({
              forecast,
              lat:req.query.lat,
              long:req.query.long
          }
          );
      })
}) 



app.get('/product', (req,res) => {
    if(!req.query.search){
        return res.send({
            error:"You must provide search term!"
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title:'404',
        errorMessage:'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title:'404',
        errorMessage:'Page not found'
    })
})




app.listen(port , () => {
    console.log(chalk.black.bgGreen.bold('Server is up on ' + port));
});