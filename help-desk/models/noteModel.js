const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema({
    text: {  
        type: String,
        require: true
    },
    user: { 
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    ticket: {
        type: Schema.Types.ObjectId,
        ref: "Ticket",
        required: true
    },
    isStaff: {
        type: Boolean,
        default: false
    },
    staffId: {
        type: String
    },
},
{
    timestamps: true
}
)

module.exports = mongoose.model("Note", noteSchema)