var express = require('express');
var router = express.Router();
var Screens=require('../module/screens.js')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/clients',function(req,res,next){
  res.render('index',{title:'clients'})
})
router.get('/screens',function(req,res,next){
  console.log(Screens)
  Screens.getAll(function(err,screen){
    console.log('success')
    console.log(screen)
    res.json(screen)
  })

})
router.post('/screens',function(req,res,next){
  var obj={
    state:'success'
  }
  console.log(req.body.speed)
  var newScreen=new Screens({
    screesArray:JSON.stringify(req.body.screenArray),
    speed:req.body.speed,
    isTop:req.body.isTop,
    favorite:req.body.favorite,
    avatarUrl:req.body.avatarUrl
  })
  newScreen.save(function (err, screen) {
    if (err) {
      return
    }
    res.json({
      id:screen["ops"][0]["_id"],
      state:'success'
    })
    // console.log('success',screen['ops'][0]["_id"])
  });
})

module.exports = router;
