const bcrypt = require("bcrypt")
const UserModel = require("../Models/Users");
const jwt = require('jsonwebtoken');

module.exports = {
    createUser: async (req, res) => {


        if (!req.body || Object.keys(req.body).length == 0) {
            return res.status(400).json({ success: false, message: "Empty request body." })
        }
        //? create user 
        try {
            // ? check for existing user
            let users = await UserModel.find({ email: req.body.emailAddress });
            if (users.length > 0) return res.status(400).json({
                success: false,
                message: "User already exists."
            })
            // ? make a bcrypt password and store to db
            bcrypt.hash(req.body.password, 12, async function (err, hash) {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: "Bcrypt failure."
                    })
                }
                //? Store hash in your password.
                let userData = {
                    ...req.body,
                    password: hash
                }
                let token = jwt.sign({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.emailAddress,
                }, 'privatekey', {
                    algorithm: 'HS256',
                    expiresIn: '5h',
                });


                let results = await UserModel(userData).save();
                if (results) {
                    return res.status(201).json({
                        success: true,
                        data: results,
                        token: token
                    })
                }

            });

        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err
            })
        }
    },
    findUser: async (req, res) => {
        console.log("params---", req.params);
        let userId = req.params.id;
        try {
            let results = await UserModel.findById(userId);
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
            let results = await UserModel.find();
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
    // updateUser: async (req, res) => {
    //     if (!req.params.id) {
    //         return res.status(400).json({
    //             success: false,
    //             message: "Id Params is missing"
    //         })
    //     }
    //     try {
    //         let userId = req.params.id
    //         let results = await UserModel.findByIdAndUpdate(userId, req.body, { new: true });
    //         if (results) {
    //             return res.status(200).json({
    //                 success: true,
    //                 data: results
    //             })
    //         }
    //     } catch (err) {
    //         return res.status(400).json({
    //             success: true,
    //             data: err.message
    //         })
    //     }
    // },
    // deleteUser: async (req, res) => {
    //     try {
    //         let userId = req.params.id;
    //         let results = await UserModel.findByIdAndDelete(userId);
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
    login: async (req, res) => {
        if (!req.body || Object.keys(req.body).length == 0) {
            return res.status(400).json({ success: false, message: "Empty request body." })
        }
        let user = await UserModel.findOne({ emailAddress: req.body.emailAddress });
        if (!user) return res.status(400).json({
            success: false,
            message: "Email is not registered."
        })

        bcrypt.compare(req.body.password, user.password)
            .then(result => {
                // result == true
                if (result) {
                    try {
                        let token = jwt.sign({
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.emailAddress,
                        }, 'privatekey', {
                            algorithm: 'HS256',
                            expiresIn: '5h',
                        });

                        delete user.password;
                        console.log(user.password)

                        return res.status(200).json({
                            success: true,
                            token: token,
                            data: user
                        })
                    } catch (err) {
                        console.error(err)
                        return res.status(500).json({
                            success: false,
                            message: "JWT signing failure"
                        })
                    }
                } else {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid Password"
                    })
                }
            }).catch(err => {

                return res.status(400).json({
                    success: false,
                    message: "Invalid Password"
                })

            });


    }
}