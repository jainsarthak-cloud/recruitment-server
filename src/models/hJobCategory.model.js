import mongoose from "mongoose";

const hJobCategorymodel = new mongoose.Schema(
    {
        category: {
            type: String,
            require: [true, 'Category name is required'],
            unique: true,
            trim: true
        }
    }
)

const himanshuJobSchema = mongoose.model("himanashuJobCategory", hJobCategorymodel)

export default himanshuJobSchema