var express = require('express');
var router = express.Router();
var pool=require('./pool')

/* GET home page. */
router.get('/fetch_all_states', function(req, res, next) {
    try{
    pool.query("select * from states", function(error, result){
        if(error){
            res.status(200).json({message:"Database error...",status:false, data:[]})
        }
        else{
            res.status(200).json({message:"success...",status:true, data:result})
           
        }
    })}
    catch(e){
        res.status(200).json({message:"Server error...",status:false, data:[]})
    }
         
    
   
});

router.post('/fetch_all_cities', function(req, res, next) {
    try{
    pool.query("select * from city where stateid=?",[req.body.stateid], function(error, result){
        if(error){
            res.status(200).json({message:"Database error...",status:false, data:[]})
            console.log(error)
        }
        else{
            res.status(200).json({message:"success...",status:true, data:result})
            console.log(result)
        }
    })}
    catch(e){
        res.status(200).json({message:"Server error...",status:false, data:[]})
        console.log(e)
    }
         
    
   
});

module.exports = router;
