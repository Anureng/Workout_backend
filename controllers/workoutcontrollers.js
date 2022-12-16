const Workout = require('../models/workoutemodule');
const mongoose = require('mongoose')

//get all workouts
const alleworkout = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 })

    res.status(200).json(workouts)
}


//get a single workout
const singleworkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such workoutes' })
    }

    const woorkout = await Workout.findById(id)

    if (!woorkout) {
        return res.status(404).json({ error: 'no such workouts' })
    }

    res.status(200).json(woorkout)

}



// create a new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body

    //add doc to db
    try {
        const workout = await Workout.create({ title, load, reps })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete a workout
const deleteworkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: 'no such workout' })
    }

    const wprkout = await Workout.findOneAndDelete({ _id: id });

    if (!wprkout) {
        res.status(404).json({ error: 'no such workout' })
    }

    res.status(200).json(wprkout)
}


//update the workout
const updateworkout = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        req.status(404).json({ error: 'no such workouts' })
    }

    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!workout) {
        res.status(404).json({ error: 'no such workout' })
    }

    res.status(200).json(workout)
}
module.exports = {
    createWorkout,
    alleworkout,
    singleworkout,
    deleteworkout,
    updateworkout
}