const router = require('express').Router();
const {ensureAuthenticated,forwardAuthenticated} = require('../config/auth')

//welcome page
router.get('/',(req,res)=>{
    res.render('welcome')
})

//dashboard page
router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    res.render('dashboard',{
        name: req.user.name
    })
})

module.exports = router;