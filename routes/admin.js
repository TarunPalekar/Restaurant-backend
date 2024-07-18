var express = require('express');
var router = express.Router();
var pool=require('./pool')

router.post('/checklogin', function(req, res, next) {
    console.log(req.body)   
    pool.query('select * from superadmin where emailid=? and password=?',[req.body.emailid,req.body.password],function(error,result){
      if(result.error)
      {
       res.status(200).json({status:false,data:[],message:'Server Error...'})
      }
      else
      {
       if(result.length==1)
       {
       
       res.status(200).json({status:true,data:result[0],message:'Login Successful'})
       }
       else
       {
           res.status(200).json({status:false,data:[],message:'Invalid userid/password'})
       }
   
      }
   
   
    })
    
   });
   
   module.exports = router;