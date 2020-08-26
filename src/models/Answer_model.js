const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema({
     qid: {
          type: String,
          required: true,
     },
     semail: {
          type: String,
          required: true,
     },
     ans: {
          type: Object,
          required: true,
          default: {},
     },
     updated_at: { type: Date, required: false, default: Date.now },
     created_at: { type: Date, required: false, default: Date.now },
});

module.exports = mongoose.model("answer", answerSchema);
