const mongoose = require("mongoose");

const SkillSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    skills: {
        type: [],
        default: undefined

    },

},
    { versionKey: false });

const SkillModel = mongoose.model("skills", SkillSchema);
module.exports = SkillModel