const express = require('express');
const Workout = require("../models/workoutemodule")
const router = express.Router()
const { createWorkout,
    singleworkout,
    alleworkout,
    updateworkout,
    deleteworkout
} = require('../controllers/workoutcontrollers')

// get all workoutes
router.get('/', alleworkout)

//get a single workoute with :id
router.get('/:id', singleworkout)

//create a new workoutes
router.post('/', createWorkout);

//delete a workoutes
router.delete('/:id', deleteworkout)

//update a workoute
router.patch('/:id', updateworkout)

module.exports = router
