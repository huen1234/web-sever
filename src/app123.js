const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



console.log(__dirname)
const pathname = path.join(__dirname, '../public')
const viewpath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname, '../templates/partials')

const app = express()


//reset express view path
//app.set('views', viewsPath)

app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialpath)


app.use(express.static(pathname))
    //app.com


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Angus'
    })
})



app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Angus'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    // geocode(req.query.address, (error, { latitude, longitude, location }) => {
    //     res.send({
    //         latitude,
    //         longitude: longitude,
    //         location
    //     })
    // })



    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'This is the text',
        title: 'Help',
        name: 'Angus'
    })
})

app.get('/help/*', (req, res) => {
    console.log('help article not found')
})


app.get('/products', (req, res) => {
    // no search term
    //cannot set headers after they are sent = 2 rsponse are sent to the client
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

//404 page must place at the ending

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Angus',
        errormsg: 'Page not found'
    })
})




app.listen(3000, () => {
    console.log('Sever is up on port 3000.')
})