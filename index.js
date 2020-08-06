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
//////////////////////////////////////////////////
// home route
app.get('/', (req, res)=>{
    // console.log('Home route was hit!')
    res.render('home')
})

// index route
app.get('/prehistoric_creatures', (req, res)=>{
    // get the json from dinosaurs.json
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    // convert the json to javascript
    let creatureData = JSON.parse(prehistoric_creatures)

    let typeFilter = req.query.typeFilter

    // keep in the dinoData any dinos whose name matches
    // the nameFilter the user searched for
    if(typeFilter){
        creatureData = creatureData.filter((creature)=>{
            return creature.type.toLowerCase()===typeFilter.toLowerCase()
        })
    }

    
    // render our dino index page and pass it the 
    // dinoData as "myDinos"
    res.render('prehistoric_creatures/index', {myCreatures: creatureData})
})

// get the new dino form
app.get('/prehistoric_creatures/new', (req, res)=>{
    res.render('prehistoric_creatures/new')
})

// show route
app.get('/prehistoric_creatures/:id', (req, res)=>{
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(prehistoric_creatures)
    // grab the id parameter from the url and convert to
    // int (was string originally)
    let creatureIndex = parseInt(req.params.id)
    res.render('prehistoric_creatures/show', {myCreatures: creatureData[creatureIndex]})
})

// post route
app.post('/prehistoric_creatures', (req, res)=>{
    // get json dinos and convert to a js array of objects
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(prehistoric_creatures)
    // push new dino to the array
    creatureData.push(req.body)
    // convert dinoData back to JSON and write to dinosaurs.json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    // redirect to the index get route
    res.redirect('/prehistoric_creatures')
})

app.listen(8000)