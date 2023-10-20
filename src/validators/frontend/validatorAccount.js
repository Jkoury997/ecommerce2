const { body } = require("express-validator");


module.exports = {
    account: [
        body("firstname").notEmpty().withMessage("Debe completar este campo"),
        body("lastname").notEmpty().withMessage("Debe completar este campo"),
        body("email")
            .notEmpty()
            .withMessage("Debe completar este campo")
            .bail()
            .isEmail()
            .withMessage("Debe ser un email válido"),
        body("dni").notEmpty().withMessage("Debe completar este campo"),
        body("born").notEmpty().withMessage("Debe completar este campo"),
    ],
}