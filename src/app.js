const path = require('path');
const express = require('express');
const chalk = require('chalk');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//tow handy variable that node provide for us
console.log(__dirname);
// console.log(__filename);
console.log(path.join(__dirname,'../public'))

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sameer Al Harbi'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Sameer Al Harbi'
    });
});

app.get('/help', (req,res) => {

    res.render('help', {
        title: 'Help',
        helpText: 'Help Text',
        name: 'Sameer Al Harbi'
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }

    const {address, language='en'} = req.query;

    geocode(address, (error, 
        {latitude, longtude, location} = {}) => {
        
        if(error) {
            console.log(chalk.red.inverse(error));
            return res.send({ error })
        }

        forecast(latitude, longtude, language, (error, forecastData) => {
            if(error) {
               return res.send({ error });
            }

            res.send({
                forecast : forecastData,
                location,
                address
            });
        });

    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
       title: '404',
       errorMessage: 'Help not found',
       name: 'Sameer Al Harbi'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Sameer Al Harbi'
     });
});

app.listen(port, () => {
    console.log(chalk.green.inverse('Server is runing on port ' + port));
});