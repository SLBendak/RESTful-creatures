var express = require('express');
var router = express.Router();
const fs = require('fs')

// index route
router.get('/', (req, res)=>{
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
router.get('/new', (req, res)=>{
    res.render('prehistoric_creatures/new')
})

// show route
router.get('/:id', (req, res)=>{
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(prehistoric_creatures)
    // grab the id parameter from the url and convert to
    // int (was string originally)
    let creatureIndex = parseInt(req.params.id)
    res.render('prehistoric_creatures/show', {myCreatures: creatureData[creatureIndex]})
})

// post route
router.post('/', (req, res)=>{
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

// edit route
// router.get('/prehistoric_creatures/edit/:id', (req, res)=>{
//     let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
//     let creatureData = JSON.parse(prehistoric_creatures)

//     let creatureIndex = parseInt(req.params.id)
    
// })






module.exports = router;