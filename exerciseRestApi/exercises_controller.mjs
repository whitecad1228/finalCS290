import 'dotenv/config';
import * as Exercises from './exercises_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
 * Create a new exercise with the name, reps, weight, unit and date provided in the body
 */
app.post('/exercises', (req, res) => {
    if(!isReqBodyValid(req)){
        res.status(400).json({ Error: "Invalid request"})
    }else{
        Exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise)
        })
        .catch(error =>{
            console.error(error)
            res.status(400).json({ Error: "Invalid request"})
        })
    }
});

/**
 * Retrive the exercise corresponding to the ID provided in the URL.
 */
app.get('/exercises/:_id', (req, res) => {
    const _id = req.params._id
    Exercises.findById(_id)
    .then(exercise => {
        if (exercise !== null){
            res.json(exercise)
        }else{
            res.status(404).json({Error: "Not found"})
        }
    })
    .catch(error =>{
        console.error(error)
        res.status(400).json({Error : "request falied"})
    })
});

/**
 * Retrieve exercises. 
 */
app.get('/exercises', (req, res) => {
    const filter = {};
    if(req.query.name !== undefined){
        filter.name = req.query.name;
    }
    if(req.query.reps !== undefined){
        filter.reps = req.query.reps;
    }
    if(req.query.weight !== undefined){
        filter.weight = req.query.weight;
    }
    if(req.query.unit !== undefined){
        filter.unit = req.query.unit
    }
    if(req.query.date !== undefined){
        filter.date = req.query.date
    }
    Exercises.findBy(filter)
    .then(exercises => {
        res.json(exercises)
    })
    .catch(error => {
        console.error(error)
        res.status(400).json({Error : "request falied"})
    })
});

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its title, year and language to the values provided in the body.
 */
app.put('/exercises/:_id', (req, res) => {
    if(!isReqBodyValid(req)){
        res.status(400).json({Error: "Invalid Request"})
    }else{
        Exercises.update(req.params._id,req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if(numUpdated === 1){
                res.json({_id: req.params._id, name:req.body.name, reps:req.body.reps, weight:req.body.weight, unit:req.body.unit, date:req.body.date});
            }else{
                res.status(404).json({Error: "Not found"});
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({Error: "Invalid Request"})
        })
    }
    
});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', (req, res) => {
    Exercises.deleteById(req.params._id)
    .then(deletedCount =>{
        if (deletedCount === 1){
            res.status(204).send();
        }else{
            res.status(404).json({Error: "Not found"})
        }
    })
    .catch(error => {
        console.error(error)
        res.send({error: "request failed"})
    })
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});



/**
*
* @param {string} req
* Return true if the req body is valid
*/
function isReqBodyValid(req){
    let ar = [req.body.name,req.body.reps,req.body.weight,req.body.unit,req.body.date]
    for(var i = 0; i < ar.length;i++){
        if(!doesBodyExists(ar[i])){
            return false
        }
    }
    if (!isNameValid(req.body.name) || !isIntValid(req.body.reps) || !isIntValid(req.body.weight) || !isDateValid(req.body.date) || !isWeightValid(req.body.unit)){
        return false
    }
    return true
}
/**
*
* @param {string} input
* Return true if the input exists 
*/
function doesBodyExists(input){
    return true ? (input !== undefined) : false
}
/**
*
* @param {string} name
* Return true if the name is a string and isnt empty
*/
function isNameValid(name){
    return true ? (typeof(name) === "string" && name !== "") : false
}
/**
*
* @param {string} int
* Return true if the int is a number and is above zero
*/
function isIntValid(int){
    return true ? (typeof(int) === "number" &&  int > 0) : false
}


/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

/**
*
* @param {string} unit
* Return true if the unit is either "lbs" or "kgs" 
*/
function isWeightValid(unit){
    return true ? (unit === "lbs" || unit === "kgs") : false

}