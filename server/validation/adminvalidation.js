const { check, validationResult } = require('express-validator');
const createError = require('http-errors')
const { AdminModel } = require('../models/adminmodel');

const checkValid = [
    check('email')
    .isEmail()
    .withMessage("Your Email is not valid")
    .custom(async(value) => {
        const isExist = await AdminModel.findOne({ email: value })
        if (isExist) {
            throw createError("Email is already used")
        } else {
            console.log("Email is not available..")
        }
    }),
    check('password')
    .isStrongPassword()
    .withMessage(
        "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    )
]

const validation = (req, res, next) => {
    const error = validationResult(req);
    const mapperError = error.mapped();
    if (Object.keys(mapperError).length === 0) {
        next()
    } else {
        res.status(500).json({
            err: mapperError
        })
    }
}

module.exports = {
    checkValid,
    validation
}