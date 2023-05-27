const SkillModel = require("../Models/Skills");

module.exports = {
    createSkill: async (req, res) => {

        if (!req.body || Object.keys(req.body).length == 0) {
            return res.status(400).json({ success: false, message: "Empty request body." })
        }
        //? create user 
        try {
            // ? check for existing user
            let skills = await SkillModel.find({ title: req.body.title });
            if (skills.length > 0) return res.status(400).json({
                success: false,
                message: "Skill already exists."
            })

            let results = await SkillModel(req.body).save();
            if (results) {
                return res.status(201).json({
                    success: true,
                    data: results
                })
            }

        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err
            })
        }
    },
    findSkill: async (req, res) => {
        console.log("params---", req.params);
        let skillId = req.params.id;
        try {
            let results = await SkillModel.findById(skillId);
            if (results) {
                return res.status(200).json({
                    success: true,
                    data: results
                })
            }
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            })
        }
    },
    findAll: async (req, res) => {
        try {
            let results = await SkillModel.find();
            if (results) {
                return res.status(200).json({
                    success: true,
                    data: results
                })
            }
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            })
        }
    },
    updateSkill: async (req, res) => {
        if (!req.params.id) {
            return res.status(400).json({
                success: false,
                message: "Id Params is missing"
            })
        }
        try {
            let skillId = req.params.id
            let singleSkill = await SkillModel.findById(skillId);
            let body = {
                ...req.body,
                skills: [...new Set([...singleSkill.skills, ...req.body.skills])]
            }
            let results = await UserModel.findByIdAndUpdate(skillId, body, { new: true });
            if (results) {
                return res.status(200).json({
                    success: true,
                    data: results
                })
            }
        } catch (err) {
            return res.status(400).json({
                success: true,
                data: err.message
            })
        }
    },
    // deleteSkill: async (req, res) => {
    //     try {
    //         let skillId = req.params.id;
    //         let results = await SkillModel.findByIdAndDelete(skillId);
    //         if (results) {
    //             return res.status(200).json({ success: true, data: results })
    //         }
    //     } catch (err) {
    //         return res.status(400).json({
    //             success: true,
    //             data: err.message
    //         })
    //     }
    // }
}