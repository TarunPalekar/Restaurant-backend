var express = require('express')
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')


router.post('/fetch_all_catagory', upload.any(), function (req, res, next) {
    try{
        console.log(req.body)
    pool.query("select * from catagory where restaurantid=?",[req.body.restaurantid], function (error, result) {
        if (error) {
            
            res.status(200).json({ status: false, message: 'Database Error' })
            console.log(error)
         

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
router.post('/catagory_submit', upload.any(), function (req, res, next) {
    try{
    pool.query("insert into catagory(restaurantid, catagoryname, icon) values(?,?,?)", [req.body.restaurantid, req.body.catagoryname, req.files[0].filename], function (error, result) {
        if (error) {
            
            res.status(200).json({ status: false, message: 'Database Error' })
            console.log(error)

        }
        else {
            res.status(200).json({ status: true, message: 'Catagory Registered' })
        }

    })}
    catch(e){
        console.log(e)
        res.status(200).json({ status: false, message: 'server Error' })
        
    }
})
router.post('/catagory_edit', upload.any(), function (req, res, next) {
    try{
    pool.query("update catagory set restaurantid=?, catagoryname=? where catagoryid=?", [req.body.restaurantid, req.body.catagoryname, req.body.catagoryid], function (error, result) {
        if (error) {
            
            res.status(200).json({ status: false, message: 'Database Error' })
            console.log(error)

        }
        else {
            res.status(200).json({ status: true, message: 'Catagory Registered' })
        }

    })}
    catch(e){
        console.log(e)
        res.status(200).json({ status: false, message: 'server Error' })
        
    }
})
router.post('/catagory_delete', upload.any(), function (req, res, next) {
    try{
    pool.query("delete from catagory where catagoryid=?", [req.body.catagoryid], function (error, result) {
        if (error) {
            
            res.status(200).json({ status: false, message: 'Database Error' })
            console.log(error)

        }
        else {
            res.status(200).json({ status: true, message: 'Catagory Registered' })
        }

    })}
    catch(e){
        console.log(e)
        res.status(200).json({ status: false, message: 'server Error' })
        
    }
})
router.post('/catagory_edit_icon', upload.any(), function (req, res, next) {
    try{
    pool.query("update catagory set icon=? where catagoryid=?", [ req.files[0].filename, req.body.catagoryid], function (error, result) {
        if (error) {
            
            res.status(200).json({ status: false, message: 'Database Error' })
            console.log(error)

        }
        else {
            res.status(200).json({ status: true, message: 'Catagory Registered' })
        }

    })}
    catch(e){
        console.log(e)
        res.status(200).json({ status: false, message: 'server Error' })
        
    }
})
module.exports = router;