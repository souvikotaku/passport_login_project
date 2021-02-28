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


//register handle
router.post('/register',(req,res)=>{
  console.log(req.body)
  res.send('hello')
})

module.exports = router;