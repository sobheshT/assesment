const router = require('express').Router();
const Service = require('../services/item.service').Product_service;
const service = new Service();
router.get('/display',(rq,rs)=>{
    rs.setHeader('content-type','application/json')
    rs.end(JSON.stringify({
    product : service.all()
    }));
});


module.exports.itemRoutes = router;
