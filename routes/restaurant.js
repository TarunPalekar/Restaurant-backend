var express = require('express')
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')


router.get('/fetch_all_restaurant', function(req, res, next) {
    try{
    pool.query("select * from restaurants", function(error, result){
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
   

router.post('/restaurant_edit_data',upload.any(), function(req, res, next) {
    pool.query("update  restaurants set restaurantname=?, ownername=?, phoneno=?, email=?, mobileno=?, url=?, fssaino=?, gst=?, gsttype=?,  address=?, stateid=?, cityid=?,  updatedat=? where restaurantid=?",[ req.body.restaurantname, req.body.ownername, req.body.phoneno, req.body.email, req.body.mobileno, req.body.url, req.body.fssaino, req.body.gst, req.body.gsttype,  req.body.address, req.body.stateid, req.body.cityid, req.body.updatedat,req.body.restaurantid],function(error,result){
    if(error)
    {
        console.log(error)
        res.status(200).json({status:false,message:'Database Error'})
    
    }
    else
    {
        res.status(200).json({status:true,message:'Restaurant Updated Successfully'})
    }
    
    })
})

router.post('/restaurant_delete', upload.any(), function (req, res, next) {
    
        pool.query("delete from restaurants where restaurantid=?",[req.body.restaurantid], function (error, result) {
            if (error) {

                res.status(200).json({ status: false, message: 'Database error...', data: [] })
                console.log(error)
            }
            else {
                res.status(200).json({ status: true, message: 'Restaurant added succesfully..', data: result })
                console.log(result)
            }
        })
    



});
router.post('/final_submit', upload.any(), function (req, res, next) {
    try {
        pool.query("insert into restaurants(restaurantname, ownername, mobileno, email, phoneno, address, stateid, cityid, url, fssaino, fileshopact, gst, filelogo, gsttype, filefssai, createdat, updatedat, password)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.restaurantname, req.body.ownername, req.body.mobileno, req.body.email, req.body.phoneno, req.body.address, req.body.stateid, req.body.cityid, req.body.url, req.body.fssaino, req.files[0].filename, req.body.gst, req.files[1].filename, req.body.gsttype, req.files[2].filename, req.body.createdat, req.body.updatedat , req.body.password], function (error, result) {
            if (error) {

                res.status(200).json({ status: false, message: 'Database error...', data: [] })
                console.log(error)
            }
            else {
                res.status(200).json({ status: true, message: 'Restaurant added succesfully..', data: result })
                console.log(result)
            }
        })
    }
    catch (e) {
        res.status(200).json({ status: false, message: 'server error...', data: [] })
        console.log(e)

    }



});
module.exports = router;