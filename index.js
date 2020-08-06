const express = require('express')
const app = express()
// create an instance of layouts
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')// will use to read json files
app.use(express.urlencoded({extend: false})) // body-parser middleware

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

    let nameFilter = req.query.nameFilter

    // keep in the dinoData any dinos whose name matches
    // the nameFilter the user searched for
    if(nameFilter){
        dinoData = dinoData.filter((dino)=>{
            return dino.name.toLowerCase()===nameFilter.toLowerCase()
        })
    }

    
    // render our dino index page and pass it the 
    // dinoData as "myDinos"
    res.render('dinosaurs/index', {myDinos: dinoData})
})

// get the new dino form
app.get('/dinosaurs/new', (req, res)=>{
    res.render('dinosaurs/new')
})

// show route
app.get('/dinosaurs/:id', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // grab the id parameter from the url and convert to
    // int (was string originally)
    let dinoIndex = parseInt(req.params.id)
    res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]})
})

// post route
app.post('/dinosaurs', (req, res)=>{
    // get json dinos and convert to a js array of objects
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // push new dino to the array
    dinoData.push(req.body)
    // convert dinoData back to JSON and write to dinosaurs.json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // redirect to the index get route
    res.redirect('/dinosaurs')
})


app.listen(8000)