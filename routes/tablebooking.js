var express = require('express')
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');


router.post('/update_table',upload.any(), function(req, res, next) {
    pool.query("update  tablebooking set restaurantid=?, tableno=?, noofchair=?, floor=? where tableid=?", [req.body.restaurantid,req.body.tableno, req.body.noofchair, req.body.floor, req.body.tableid],function(error,result){
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

router.post('/fetch_all_floor',function(req,res){
    pool.query('select floor from tablebooking where restaurantid=? group by floor',[req.body.restaurantid],function(error,result){
        if(error)
        {
            console.log(error)
            res.status(200).json({status:false,message:'Database Error',data:[]})
        
        }
        else
        {  console.log(result)
            res.status(200).json({status:true,data:result,message:'Fooditems Get Successfully'})
        }
    }) 
    })

    router.post('/fetch_all_table_by_floor',function(req,res){
        pool.query('select * from tablebooking where restaurantid=? and floor=?',[req.body.restaurantid,req.body.floor],function(error,result){
            if(error)
            {
                console.log(error)
                res.status(200).json({status:false,message:'Database Error',data:[]})
            
            }
            else
            {  console.log(result)
                res.status(200).json({status:true,data:result,message:'Fooditems Get Successfully'})
            }
        }) 
        })
    
    

router.post('/fetch_all_table', function(req, res, next) {
    try{
    pool.query("select * from tablebooking where restaurantid=?",[req.body.restaurantid], function(error, result){
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
   

router.post('/final_submit', upload.any(), function (req, res, next) {
    try {
        pool.query("insert into tablebooking(restaurantid,tableno, noofchair, floor)values(?,?,?,?)", [req.body.restaurantid, req.body.tableno, req.body.noofchair, req.body.floor], function (error, result) {

            if (error) {
                console.log(error)
                res.status(200).json({ status: false, message: 'Database Error' })

            }
            else {
                res.status(200).json({ status: true, message: 'Restaurant Updated Successfully' })
            }
        })
    }
    catch (e) {
        console.log(error)
        res.status(200).json({ status: false, message: 'server Error' })


    }

})

module.exports = router;
