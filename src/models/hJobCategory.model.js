import mongoose from "mongoose";

const hJobCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Category name is required'],
            unique: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);


const himanshuJobCategory = mongoose.model("himanshuJobCategory", hJobCategorySchema)

export default himanshuJobCategory;
