var express = require('express')
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')
router.post('/final_submit', upload.any(), function (req, res, next) {
    try {
        console.log(req.body)
        pool.query("insert into waitertable( restaurantid, floorno, tablenoid, currentdate, waiterid) values(?,?,?,?,?)", [req.body.restaurantid, req.body.floorno, req.body.tablenoid, req.body.currentdate, req.body.waiterid], function (error, result) {
            if (error) {

                res.status(200).json({ status: false, message: 'Database Error' })
                console.log(error)


            }
            else {
                res.status(200).json({ status: true, message: 'waiter Registered', data: result })

            }

        })
    }
    catch (e) {
        console.log(e)
        res.status(200).json({ status: false, message: 'server Error' })


    }
})
router.get('/fetch_all_waitertable', upload.any(), function (req, res, next) {
    try {
        console.log(req.body)
        pool.query("select WT.*,(select W.waitername from waiters W where W.waiterid=WT.waiterid) as waitername, (select T.tableno from tablebooking T where T.tableid=WT.tablenoid) as tableno,(select T.floor from tablebooking T where T.tableid=WT.tablenoid) as floor from waitertable WT ", function (error, result) {
            if (error) {

                res.status(200).json({ status: false, message: 'Database Error' })
                console.log(error)


            }
            else {
                res.status(200).json({ status: true, message: 'waiter Registered', data: result })

            }

        })
    }
    catch (e) {
        console.log(e)
        res.status(200).json({ status: false, message: 'server Error' })


    }
})
module.exports = router