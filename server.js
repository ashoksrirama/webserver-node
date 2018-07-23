const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}, ${req.method}, ${req.path}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Error while appending the file.');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello World.!</h1>');
    // res.send({
    //     name: 'Ashok',
    //     likes: ['cricket', 'cities']
    // })
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: 'Welcome to website'
    })
});

app.get('/about', (req, res) => {
    // res.send('About page.');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Error fulfilling the request'
    });
});
app.listen(3000, () => {
    console.log('Server is up on 3000 port.');
});