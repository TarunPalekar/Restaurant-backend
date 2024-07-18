var express = require('express')
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

router.post('/fetch_all_fooditem_categorywise',function(req,res){
    console.log(req.body)
    pool.query('select F.*, (select C.catagoryname from catagory C where C.catagoryid=F.catagoryid) as categoryname from fooditems F where F.restaurantid=? and F.catagoryid=?',[req.body.restaurantid,req.body.catagoryid],function(error,result){
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


router.get('/fetch_all_catagory', function (req, res, next) {
    try {
        pool.query("select * from catagory", function (error, result) {
            if (error) {

                res.status(200).json({ status: false, message: 'Database Error' })


            }
            else {
                res.status(200).json({ status: true, message: 'Catagory Registered', data: result })

            }

        })
    }
    catch (e) {
        console.log(e)
        res.status(200).json({ status: false, message: 'server Error' })


    }
})
router.post('/fetch_all_fooditems', function (req, res, next) {
    try {
        pool.query("select * from fooditems where restaurantid=?",[req.body.restaurantid], function (error, result) {
            if (error) {

                res.status(200).json({ status: false, message: 'Database Error' })


            }
            else {
                res.status(200).json({ status: true, message: 'Catagory Registered', data: result })

            }

        })
    }
    catch (e) {
        console.log(e)
        res.status(200).json({ status: false, message: 'server Error' })


    }
})
router.post('/final_submit', upload.any(), function (req, res, next) {
    try {
        pool.query("insert into fooditems(restaurantid, catagoryid, fooditemname, foodtype, ingredients, price, offerprice, icon) values(?,?,?,?,?,?,?,?)", [req.body.restaurantid, req.body.catagoryid, req.body.fooditemname, req.body.foodtype, req.body.ingredients, req.body.price, req.body.offerprice, req.files[0].filename], function (error, result) {
            if (error) {

                res.status(200).json({ status: false, message: 'Database Error' })
                console.log(error)

            }
            else {
                res.status(200).json({ status: true, message: 'Catagory Registered' })
            }

        })
    }
    catch (e) {
        console.log(e)
        res.status(200).json({ status: false, message: 'server Error' })

    }
})
module.exports = router