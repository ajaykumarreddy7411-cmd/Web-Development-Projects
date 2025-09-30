import mongoose from "mongoose";

const handleSchema = mongoose.Schema({
    name: { type: String, required: true },
    phno: { type: Number, max: 9999999999, required: true },
    email: { type: String },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Phone", handleSchema);