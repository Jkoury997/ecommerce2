const { Router} = require('express');
const router = Router()

//Routers
const frontendRouter = require("./frontend/authRoutes")

router.use('/',frontendRouter)


module.exports = router