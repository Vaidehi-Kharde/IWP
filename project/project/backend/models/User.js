const { type } = require("@testing-library/user-event/dist/type")

const mongoose = require('mongoose')
// mongoose is defined as an object represnting the complete mongoose library

const {Schema} = mongoose
// {} => are JavaScripts destructing syntax used to extract a specific content from the object
// Schema is a class that we have extracted from an object mongoose representing the complete mongoose library

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // date: {
    //     type: String,
    //     required: true
    // }
})

module.exports = mongoose.model('user', UserSchema)
