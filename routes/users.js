const router = require('express').Router();

//login
router.get('/login',(req,res)=>{
    res.render('login')
})

//partials
// <%- include ("./partials/messages"); %>



//register
router.get('/register',(req,res)=>{
    res.render('register')
})

module.exports = router;