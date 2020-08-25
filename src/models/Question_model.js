const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    name: {
        unique: true,
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    questions: {
        type: Array,
        required: false,
    },
    updated_at: { type: Date, required: false, default: Date.now },
    created_at: { type: Date, required: false, default: Date.now },
});

module.exports = mongoose.model("question", questionSchema);
