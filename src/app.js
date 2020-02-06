const express = require('express');
const chalk = require('chalk');

const app = express();

app.get('', (req, res) => {
    res.send('Hello express!');
});

app.get('/help', (req, res) => {
    res.send('Help page');
});

app.get('/about', (req, res) => {
    res.send('About');
});

app.get('/weather', (req, res) => {
    res.send('Your weather');
});

app.listen(3000, () => {
    console.log(chalk.green.inverse('Server is runing on port 3000'));
});