const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        unique: true,
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    is_active: {
        type: Boolean,
        default: true,
        required: false,
    },
    updated_at: { type: Date, required: false, default: Date.now },
    created_at: { type: Date, required: false, default: Date.now },
});

module.exports = mongoose.model("admin", adminSchema);
