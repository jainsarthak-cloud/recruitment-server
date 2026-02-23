import mongoose from "mongoose";

const  {Schema}  = mongoose

const productSchema = new Schema({
  name:{
    type:String,
    required:true,
    trim:true
  },
  description:{
    type:String,
    trim:true,
  },
  price:{
    type:Number,
    trim:true
  },
  stock:{
    type:Number,
    default:0
  },
  category:{
    type:String,
    trim:true
  },
  isActive:{
    type:Boolean,
    default:true
  }
},
{
  timestamps:true,
  collection:"products"
}
)

productSchema.index({name:1})
productSchema.index({category:1})

export const productModel = mongoose.model("Product",productSchema)