const express = require('express')
const app = express()
// create an instance of layouts
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')// will use to read json files

// tell express we're using ejs
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// home route
app.get('/', (req, res)=>{
    // console.log('Home route was hit!')
    res.render('home')
})

// index route
app.get('/dinosaurs', (req, res)=>{
    // get the json from dinosaurs.json
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    // convert the json to javascript
    let dinoData = JSON.parse(dinosaurs)
    // render our dino index page and pass it the 
    // dinoData as "myDinos"
    res.render('dinosaurs/index', {myDinos: dinoData})
})

app.listen(8000)