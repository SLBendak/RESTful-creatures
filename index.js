const express = require('express')
const app = express()
// create an instance of layouts
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')// will use to read json files
app.use(express.urlencoded({extended: false})) // body-parser middleware

// tell express we're using ejs
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// home route
app.get('/', (req, res)=>{
    // console.log('Home route was hit!')
    res.render('home')
})

app.use('/dino', require('./controllers/dino'))
app.use('/prehistoric_creatures', require('./controllers/creatures'))
app.listen(8000)