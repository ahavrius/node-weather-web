const path = require('path')
const express = require('express');
const hbs = require('hbs')

const forcast = require('./utils/forcast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

const staticPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(staticPath))

const name = 'Nastia'

app.get('', (req, res) =>
    res.render('index', {
        title:  'Weather', name
    }))

app.get('/about', (req, res) => 
    res.render('basic', {
        title: 'About', name
    })
)

app.get('/help', (req, res) => 
    res.render('basic', {
        title: 'Help', name
    })
)


app.get('/weather', (req, res) => {
    if (!req.query.address)
        return res.send({
            errorMessage: "No address provided"
        })
    geocode(req.query.address, (error, {longitude, latitude, location}={}) => {
        if (error)
            return res.send({
                errorMessage: error
            })
            forcast(latitude, longitude, (error, {temperature, description}={}) => {
                if (error)
                    return res.send({
                        errorMessage: error
                    })
                res.send({
                    status: 'ok',
                    address: req.query.address,
                    location,
                    temperature,
                    description
                })
            });
        })
    })


app.get('/help/*', (req, res) => 
    res.render('error', {
        title: '404 error',
        errorMessage: '..Try another help request..', name
})
)

app.get('*', (req, res) => 
    res.render('error', {
        title: '404 error',
        errorMessage: '..Nothing has been found..', name
})
)

app.listen(port, () => {
    console.log('Launged ' + port)
})
