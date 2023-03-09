const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ticketSchema = new Schema({
    product: {
        type: String,
        required: true,
        enum:["email", "internet", "microsoft", "hardware"]
    },
    description:{
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum:['new', 'open', 'closed'],
        default: 'new'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Ticket', ticketSchema)