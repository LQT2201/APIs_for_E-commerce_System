const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema  = new Schema({
    name:{
        type:String,
        requied:true,
        unique:true
    },
    description:{
        type:String
    },
    parentCategory:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        default:null
    }
},{
    timestamps:true
})

const Category = mongoose.model('Category',categorySchema)

module.exports = Category