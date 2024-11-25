const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = mongoose.Schema({
    title:{
        type: String,
    required : true,
    },
    description:{
        type: String,
        required: true
    },
    status : {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('todo', TodoSchema);