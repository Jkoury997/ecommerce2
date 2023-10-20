const { validationResult } = require("express-validator")

module.exports = {
    login: (req, res, next) =>{
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()){
            req.session.errors = errors.mapped();
            req.session.oldData = req.body;
            res.redirect('/login');
        }
        else{
            next();
        }
    },
    register:(req, res, next) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            req.session.errors = errors.mapped();
            req.session.oldData = req.body;
            res.redirect('/register');
        }
        else{
            next();
        }
    }
}