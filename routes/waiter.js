var express = require('express')
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')
router.post('/final_submit', upload.any(), function (req, res, next) {
    try{
    pool.query("insert into waiters(restaurantid, waitername, gender, dob, mobileno, emailid, address, picture) values(?,?,?,?,?,?,?,?)",[ req.body.restaurantid,  req.body.waitername, req.body. gender,  req.body.dob,  req.body.mobileno,  req.body.emailid,  req.body.address, req.files[0].filename], function (error, result) {
        if (error) {
            
            res.status(200).json({ status: false, message: 'Database Error' })
            console.log(error)
         

        }
        else {
            res.status(200).json({ status: true, message: 'waiter Registered' , data:result})
          
        }

    })}
    catch(e){
        console.log(e)
        res.status(200).json({ status: false, message: 'server Error' })
       
        
    }
}) 
router.post('/fetch_all_waiter', upload.any(), function (req, res, next) {
    try{
    pool.query("select * from waiters where restaurantid=?",[req.body.restaurantid], function (error, result) {
        if (error) {
            
            res.status(200).json({ status: false, message: 'Database Error' })
         

        }
        else {
            res.status(200).json({ status: true, message: 'Catagory Registered' , data:result})
          
        }

    })}
    catch(e){
        console.log(e)
        res.status(200).json({ status: false, message: 'server Error' })
       
        
    }
})
module.exports=router