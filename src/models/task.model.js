import mongoose from 'mongoose'

let taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
},
{
    timestamps:true
})

const Task = mongoose.model("task", taskSchema)
export default Task;