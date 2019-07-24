const router = require('express').Router();

const Service = require('../services/item.service').Product_service;

const service = new Service();
router.get('/display',(rq,rs)=>{
    

    rs.setHeader('content-type','application/json')

    rs.end(JSON.stringify({

        product : service.all()

    }));

});
router.get('/display1',(rq,rs)=>{
    

    rs.setHeader('content-type','application/json')

    rs.end(JSON.stringify({
        
        product : service.all1()

    }));

});
router.post('/mail',(rq,rs)=>{
    

    rs.setHeader('content-type','application/json')

    rs.json({data: service.email(rq.body)})

    

});

router.get('/search/:id',(rq,rs)=>{
    

    rs.setHeader('content-type','application/json')

    rs.end(JSON.stringify({
        
        product : service.search(rq.params.id)

    }));

});

router.get('/modify/:name/:quantity',(rq,rs)=>{

     
    service.modify(rq.params.name,rq.params.quantity);

});
module.exports.itemRoutes = router;
