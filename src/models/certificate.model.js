import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    type: {
        type: String,
        enum: ["Completion", "Internship", "Offer", "Other"],
        default: "Other"
    },

    file: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }

},
    { timestamps: true },
);

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;