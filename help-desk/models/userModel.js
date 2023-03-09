const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
      },
},
{
  timestamps: true
})

module.exports = mongoose.model("User", userSchema)