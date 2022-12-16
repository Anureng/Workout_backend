const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')

const Schema = mongoose.Schema

const useSchema = new Schema({
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true,
        unique: true
    }

})

//static signup method

useSchema.statics.signup = async function (email, password) {

    //validate

    if (!email || !password) {
        throw Error('Please fill the email and password');
    }

    if (!validator.isEmail(email)) {
        throw Error('email must be a valid email');
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Please fill the strong password');
    }

    const exist = await this.findOne({ email })

    if (exist) {
        throw Error("Email is already used")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash })

    return user
}

// statics login method

useSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('Please file the email and password')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect email ')
    }

    const matches = await bcrypt.compare(password, user.password)

    if (!matches) {
        throw Error('Invalid password')
    }

    return user
}

module.exports = mongoose.model('User', useSchema)